const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const asyncHandler = require("express-async-handler");
const travelDiary = require("../models/travelModel.js");
// @dec Get all travel diary
// @routes Get /api/user/admin/allTravelDiary
// @access private
//admin only access
const getALLTravelDiaries = asyncHandler( async (req,res) =>{
    const diaries = await travelDiary.find();
    res.status(200).json(diaries);
});

// @dec Get all travel diary
// @routes Get /api/entries
// @access private

const getTravelDiaries = asyncHandler( async (req,res) =>{
    const diaries = await travelDiary.find({user_id:req.user.id});
    res.status(200).json(diaries);
});

// @dec Get travel diary
// @routes Get /api/entries/:id
// @access private
const getTravelDiary = asyncHandler( async (req,res) =>{
    const diary = await travelDiary.findById(req.params.id);
    if(!diary){
        res.status(404);
        throw new Error("Travel Diary not found");
    }
    res.status(200).json(diary);
});

// @dec Create travel diary
// @routes Post /api/entries
// @access private
const createTravelDiary = asyncHandler( async (req,res) =>{
    const {location,date,notes,driveFolderUrl} = req.body;
    if(!location || !date){
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        res.status(400);
        throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
        res.status(400);
        throw new Error("Invalid calendar date");
    }
    if (driveFolderUrl && !driveFolderUrl.startsWith("https://drive.google.com/drive/folders/")) {
        res.status(400);
        throw new Error("Invalid Google Drive folder URL");
    }
    const diary = await travelDiary.create({
        user_id:req.user.id,
        location,
        date,
        notes,
        driveFolderUrl,

    });
    res.status(201).json(diary);
});

// @dec Update travel diary
// @routes Put /api/entries/:id
// @access private
const updateTravelDiary = asyncHandler( async (req,res) =>{
    const diary = await travelDiary.findById(req.params.id);
    if(!diary){
        res.status(404);
        throw new Error("Travel Diary not found");
    }
    if(diary.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error(" User don't have permission to update");
    }
    const updatedDiary = await travelDiary.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updatedDiary);
});

// @dec Delete travel diary
// @routes Delete /api/entries/:id
// @access private
const deleteTravelDiary = asyncHandler( async (req,res) =>{
    const diary = await travelDiary.findById(req.params.id);
    if(!diary){
        res.status(404);
        throw new Error("Travel Diary not found");
    }
    if(diary.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error(" User don't have permission to update");
    }
    await travelDiary.findByIdAndDelete(req.params.id);
    res.status(200).json(diary);
});

module.exports = {getALLTravelDiaries,getTravelDiaries , getTravelDiary , createTravelDiary , updateTravelDiary , deleteTravelDiary};