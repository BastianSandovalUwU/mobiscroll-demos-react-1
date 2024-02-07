import { Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const handleEventClick = useCallback((args) => {
    setToastMessage(args.event.title);
    setToastOpen(true);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar data={myEvents} view={myView} onEventClick={handleEventClick} />
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
}

export default App;
