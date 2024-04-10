import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProfileDetails } from 'src/app/types/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  showEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    
    username: '',
    email: '',
  };

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required]],
    
  });

  constructor(private fb: FormBuilder, private userService: UserService, ) {}
  
  ngOnInit(): void {
    const { username, email } = this.userService.user!;
debugger
    this.profileDetails = {
      username,
      email,
    };

    this.form.setValue({
      username,
      email,
    });
  }

  onToggle(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveProfileHandle(): void {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const { username, email } = this.profileDetails;

    this.userService.updateProfile(username, email).subscribe(() => {
      this.onToggle();
    });
  }

  onCancel(e: Event) {
    e.preventDefault();
    this.onToggle();
  }




}

