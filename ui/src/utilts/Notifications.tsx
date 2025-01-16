'use client'
import { useState } from "react";

export default function showNotification(message: string, setNotification: Function){
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };


  