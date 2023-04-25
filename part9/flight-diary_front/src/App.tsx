import {useEffect, useState} from 'react';
import {Diary, Visibility, Weather} from './types';
import {createDiary, getAllDiaries} from './services/diaries';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      visibility: visibility,
      weather: weather,
      date: date,
      comment: comment
    };
    createDiary(diaryToAdd).then(data => setDiaries(diaries.concat(data)));
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          visibility
          <select value={visibility} onChange={({target}) => setVisibility(target.value as Visibility)}>
            {Object.keys(Visibility).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          weather
          <select value={weather} onChange={({target}) => setWeather(target.value as Weather)}>
            {Object.keys(Weather).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          comment
          <input type="text" value={comment} onChange={({target}) => setComment(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
