import { NotesService } from './../notes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
allNotes
token
data
decoded
isLoad:boolean=false
  constructor(private _Router:Router,private _NotesService:NotesService) { 
     this.token = localStorage.getItem("TOKEN");
    //  ----------------------- get all data of User by JWT-decoded and want to install JWT-decoded in NPM------
     try{
      this.token=localStorage.getItem("TOKEN");
      this.decoded = jwt_decode(this.token);

    
     }
     catch(error)
     {
      localStorage.clear();
      this._Router.navigate(["/signin"])
     }
     this.uniqData()
// ------------------------- if TOKEN not in localStorage navigate to sigin ---------------------------------
    if (!localStorage.getItem("TOKEN")) {
      this._Router.navigate(['/signin'])
    }
  }
  // ------------------------------------------ Add Note -----------------------------------
  addData()
  {
   let data={
     title:this.addNote.value.title,
     desc:this.addNote.value.desc,
     citizenID:this.decoded._id,
     token:this.token
   }
   this._NotesService.addNote(data).subscribe((res)=>{
     console.log(res);
     if (res.message=="success") {
       $("#AddNote").modal("hide");
       this.addNote.reset();
       this.uniqData()
       this.isLoad=true
     }
     
   })
  }
  // ----------------------------------------- show all Notes of Users-----------------------------------------
  uniqData()
  {
    this.data={
      token:this.token,
      userID:this.decoded._id
    }

    this._NotesService.getAllNotes(this.data).subscribe((res)=>{
      
      if (res.message=="success") {
        this.allNotes=res.Notes
      
      
        this.isLoad=true
        ;
        
      }
      else{
        localStorage.clear();
      this._Router.navigate(["/signin"])
      }
     
    })
  }
    //--------------------------------- Reactive Form ---------------------------------- 
  addNote=new FormGroup({
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
  })
NoteID
  getId(id)
  {
    this.NoteID=id;
    console.log(id);
    
  }
  // --------------------------- Delete Note -------------------------------
  deleteNote()
  {
    let data={
      NoteID:this.NoteID,
      token:this.token
    }
    this._NotesService.deleteNote(data).subscribe((res)=>{
      if (res.message=="deleted") {
        $("#DeleteNote").modal("hide");
       
       this.uniqData()
      }
      
    })
  }
  // --------------------------------------------- Edit Note --------------------------------------------
  editNotes=new FormGroup({
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
  })
  setValue()
  {
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id==this.NoteID) {
        console.log(this.allNotes[index]);
        this.editNotes.controls.title.setValue(this.allNotes[index].title)
        this.editNotes.controls.desc.setValue(this.allNotes[index].desc)
        
      }
     
      
    }
  }
  editNote(){
    let data ={
      token:this.token,
      title:this.editNotes.value.title,
      desc:this.editNotes.value.desc,
      NoteID:this.NoteID
    }
    this._NotesService.editNote(data).subscribe((res)=>{
      console.log(res);
      if (res.message=="updated") {
        $("#EditNote").modal("hide");
       
        this.uniqData();
        
      }
      
    })
  }
  ngOnInit(): void {
  }

}
