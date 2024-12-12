"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";

export function NewEntryDialog({ onSave }) {
  const [open, setOpen] = useState(false);
  const [gratitude, setGratitude] = useState("");

  const handleSave = async () => {
    if (!gratitude.trim()) {
      alert("Please enter what you're grateful for.");
      return;
    }

    try {
      await onSave({ gratitude }); // Call onSave from parent component
      setGratitude(""); // Clear input
      setOpen(false); // Close the dialog
    } catch (err) {
      console.error("Error saving gratitude entry:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#A7C4A0] hover:bg-[#96B38F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">What Are You Grateful For Today?</DialogTitle>
          <DialogDescription>
            It can be anything big or small—a kind gesture, a good meal, a moment of peace, or
            something you accomplished.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Textarea
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="Type here... (e.g., I'm grateful for the sunny weather and the walk I took with my friend.)"
            className="min-h-[200px] bg-[#f8fdf7]"
          />
        </div>
        <Button
          className="w-full mt-4 bg-[#A7C4A0] hover:bg-[#96B38F] text-white"
          onClick={handleSave}
        >
          Save Entry
        </Button>
      </DialogContent>
    </Dialog>
  );
}
