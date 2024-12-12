import React, { useState } from 'react';
import MoodSlider from './form/MoodSlider';
import SleepSection from './form/SleepSection';
import StressAnxietySection from './form/StressAnxietySection';
import ActivitiesSection from './form/ActivitiesSection';
import { format } from 'date-fns';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook

export default function NewEntryForm({ onClose, onEntryAdded }) {
  const [mood, setMood] = useState(3);
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [anxiety, setAnxiety] = useState(3);
  const [stress, setStress] = useState(3);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast(); // Destructure the toast function from useToast

  const handleActivityToggle = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (sleepHours <= 0) {
      setError('Please enter a valid number of sleep hours.');
      return;
    }

    const entryData = {
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      mood,
      sleep: { hours: sleepHours, quality: sleepQuality },
      anxiety,
      stress,
      activities: selectedActivities,
      note,
    };

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/mood-entries', entryData);
      console.log("Server response:", response.data);

      // Display toast on successful entry save
      toast({
        title: 'Entry saved successfully',
        description: "Your mood entry has been recorded.",
        status: 'success',
        duration: 3000, // Display for 3 seconds
        isClosable: true,
      });

      if (onEntryAdded) {
        onEntryAdded(response.data); // Notify parent with the new entry
      }

      onClose(); // Close the form
    } catch (error) {
      console.error('Error saving entry:', error);
      setError('Failed to save entry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-montreal bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto relative">
      {/* Close button (X) */}
      <button
        onClick={onClose}
        className="text-2xl absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <b>&#x2715;</b>
      </button>

      <h2 className="text-2xl font-semibold mb-6">How Are You Feeling Today?</h2>

      <div className="space-y-6">
        <MoodSlider value={mood} onChange={(e) => setMood(e.target.value)} />

        <SleepSection
          hoursValue={sleepHours}
          qualityValue={sleepQuality}
          onHoursChange={(e) => setSleepHours(parseInt(e.target.value) || 0)}
          onQualityChange={(e) => setSleepQuality(parseInt(e.target.value) || 3)}
        />

        <StressAnxietySection
          anxietyValue={anxiety}
          stressValue={stress}
          onAnxietyChange={(e) => setAnxiety(parseInt(e.target.value) || 3)}
          onStressChange={(e) => setStress(parseInt(e.target.value) || 3)}
        />

        <ActivitiesSection
          selectedActivities={selectedActivities}
          onActivityToggle={handleActivityToggle}
        />

        <div>
          <label className="block mb-2">Add A Note (Optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-200 outline-none"
            placeholder="Write about what's influencing your mood today..."
          />
        </div>

        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

        <button
          onClick={handleSubmit}
          className="w-full mb-6 bg-[#A9C89A] text-white py-3 rounded-lg hover:bg-[#68835B] transition-colors"
          disabled={loading} // Disable button while submitting
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </div>
  );
}
