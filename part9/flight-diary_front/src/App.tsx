import { useState, useEffect } from 'react'
import {Diary} from "./types";
import {getAllDiaries} from "./services/diaries";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Diaries</h1>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
