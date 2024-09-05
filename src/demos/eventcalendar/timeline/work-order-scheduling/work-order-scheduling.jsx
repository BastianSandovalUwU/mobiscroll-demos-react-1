import {
  Button,
  Checkbox,
  Datepicker,
  Eventcalendar,
  formatDate,
  Input,
  Popup,
  setOptions,
  Snackbar,
  Textarea /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './work-order-scheduling.css';

setOptions({
  // localeJs,
  // themeJs
});

const defaultEvents = [
  {
    start: 'dyndatetime(y,m,d-4,6)',
    end: 'dyndatetime(y,m,d-4,14)',
    title: 'Farmhouse TPH',
    location: '3339 Spruce Drive',
    resource: ['d2', 'cm2', 'd4', 'cp1', 'cm2', 'ce2', 'b1'],
    color: '#12ca6c',
    cost: 48000,
  },
  {
    start: 'dyndatetime(y,m,d-3,8)',
    end: 'dyndatetime(y,m,d-3,18)',
    title: 'Block of flats KXT',
    location: '4698 Mercer Street',
    resource: ['d1', 'cm1', 'd3', 'cp1', 'cm3', 'ce2', 'b2'],
    color: '#c170c3',
    cost: 36000,
  },
  {
    start: 'dyndatetime(y,m,d-2,12)',
    end: 'dyndatetime(y,m,d-2,20)',
    title: 'Apartment house UGL',
    location: '3647 Tavern Place',
    resource: ['d3', 'cm2', 'd4', 'cp2', 'cm3', 'ce1', 'b2'],
    color: '#03c9d2',
    cost: 50000,
  },
  {
    start: 'dyndatetime(y,m,d-1,11)',
    end: 'dyndatetime(y,m,d-1,19)',
    title: 'Detached house WKB',
    location: '956 Dovetail Estates',
    resource: ['d1', 'cm3', 'd4', 'cp3', 'cm4', 'c2', 'b1', 'ce2'],
    color: '#ff1515',
    cost: 55000,
  },
  {
    start: 'dyndatetime(y,m,d,10)',
    end: 'dyndatetime(y,m,d,18)',
    title: 'Apartment house XAZ',
    location: '4919 Jett Lane, Inglewood',
    resource: ['d1', 'cm4', 'd4', 'cp1', 'cm2', 'c2', 'b2'],
    color: '#12ca6c',
    cost: 62000,
  },
  {
    start: 'dyndatetime(y,m,d,8)',
    end: 'dyndatetime(y,m,d,16)',
    title: 'Block of flats DRG',
    location: '486 Sycamore Fork Road',
    resource: ['d2', 'cm1', 'd3', 'cp2', 'ce2', 'c1', 'b1'],
    color: '#efd414',
    cost: 39000,
  },
  {
    start: 'dyndatetime(y,m,d+1,9)',
    end: 'dyndatetime(y,m,d+1,17)',
    title: 'Farmhouse YQK',
    location: '1563 Retreat Avenue',
    resource: ['d2', 'cm4', 'd4', 'cm2', 'cp1', 'c2', 'b2'],
    color: '#cf49d8',
    cost: 45000,
  },
  {
    start: 'dyndatetime(y,m,d+2,7)',
    end: 'dyndatetime(y,m,d+2,15)',
    title: 'Apartment house SWP',
    location: '628 Daylene Drive',
    resource: ['d2', 'cm3', 'd3', 'cm1', 'cp2', 'c1', 'b1'],
    color: '#c170c3',
    cost: 53000,
  },
  {
    start: 'dyndatetime(y,m,d+3,10)',
    end: 'dyndatetime(y,m,d+3,18)',
    title: 'Detached house OZL',
    location: '1830 Rinehart Road',
    resource: ['d3', 'cm2', 'd4', 'cp2', 'cm3', 'ce1', 'b2'],
    color: '#ff1515',
    cost: 47000,
  },
  {
    start: 'dyndatetime(y,m,d+4,11)',
    end: 'dyndatetime(y,m,d+4,19)',
    title: 'Farmhouse PSZ',
    location: '2410 Union Street',
    resource: ['d1', 'cm3', 'd4', 'cp3', 'cm4', 'c2', 'b1', 'ce2'],
    color: '#ff1515',
    cost: 64000,
  },
];
const myResources = [
  {
    id: 'contractors',
    name: 'Contractors',
    collapsed: true,
    eventCreation: false,
    children: [
      {
        id: 'builders',
        name: 'Builders',
        eventCreation: false,
        children: [
          {
            id: 'b1',
            name: 'Jude Chester',
          },
          {
            id: 'b2',
            name: 'Willis Kane',
          },
        ],
      },
      {
        id: 'carpenters',
        name: 'Carpenters',
        eventCreation: false,
        children: [
          {
            id: 'c1',
            name: 'Derek Austyn',
          },
          {
            id: 'c2',
            name: 'Merv Kenny',
          },
        ],
      },
    ],
  },
  {
    id: 'employees',
    name: 'Employees',
    eventCreation: false,
    children: [
      {
        id: 'cement_masons',
        name: 'Cement masons',
        eventCreation: false,
        children: [
          {
            id: 'ce1',
            name: 'Ford Kaiden',
          },
          {
            id: 'ce2',
            name: 'Jewell Ryder',
          },
        ],
      },
      {
        id: 'divers',
        name: 'Drivers',
        eventCreation: false,
        children: [
          {
            id: 'd1',
            name: 'Fred Valdez',
          },
          {
            id: 'd2',
            name: 'Jon Drake',
          },
          {
            id: 'd3',
            name: 'Lou Andie',
          },
          {
            id: 'd4',
            name: 'Leon Porter',
          },
        ],
      },
    ],
  },
  {
    id: 'equipment',
    name: 'Equipment',
    collapsed: true,
    eventCreation: false,
    children: [
      {
        id: 'concrete_mixers',
        name: 'Concrete mixers',
        eventCreation: false,
        children: [
          {
            id: 'cm1',
            name: 'AL 45 RFT',
          },
          {
            id: 'cm2',
            name: 'KQ 62 PVZ',
          },
          {
            id: 'cm3',
            name: 'RG 91 ZAL',
          },
          {
            id: 'cm4',
            name: 'XF 83 GFM',
          },
        ],
      },
      {
        id: 'concrete_pumps',
        name: 'Concrete pumps',
        eventCreation: false,
        children: [
          {
            id: 'cp1',
            name: 'GF 61 BVM',
          },
          {
            id: 'cp2',
            name: 'YC 55 ECT',
          },
        ],
      },
    ],
  },
];

const viewSettings = {
  timeline: {
    type: 'month',
  },
};

const responsivePopup = {
  medium: {
    display: 'anchored',
    width: 520,
    fullScreen: false,
    touchUi: false,
  },
};

function App() {
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [tempEvent, setTempEvent] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [start, startRef] = useState(null);
  const [end, endRef] = useState(null);
  const [popupEventTitle, setTitle] = useState('');
  const [popupEventLocation, setLocation] = useState('');
  const [popupEventBill, setBill] = useState(0);
  const [popupEventNotes, setNotes] = useState('');
  const [popupEventDate, setDate] = useState([]);
  const [checkedResources, setCheckedResources] = useState([]);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const calInst = useRef();

  const snackbarButton = useMemo(
    () => ({
      action: () => {
        setMyEvents([...myEvents, tempEvent]);
      },
      text: 'Undo',
    }),
    [myEvents, tempEvent],
  );

  const checkboxChange = useCallback(
    (ev) => {
      const value = ev.target.value;

      if (ev.target.checked) {
        setCheckedResources((checkedResources) => [...checkedResources, value]);
      } else {
        setCheckedResources(checkedResources.filter((r) => r !== value));
      }
    },
    [checkedResources],
  );

  const saveEvent = useCallback(() => {
    if (!validateForm()) {
      console.log("Hay campos obligatorios que no están completos");
      return;
    }
  
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      location: popupEventLocation,
      cost: popupEventBill,
      notes: popupEventNotes,
      start: popupEventDate[0],
      end: popupEventDate[1],
      color: tempEvent.color,
      resource: checkedResources,
    };

    console.log(newEvent);
  
    if (isEdit) {
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];
  
      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
    } else {
      setMyEvents([...myEvents, newEvent]);
    }
    
    calInst.current.navigateToEvent(newEvent);
    setPopupOpen(false);
  }, [
    isEdit, 
    myEvents, 
    popupEventDate, 
    popupEventNotes, 
    popupEventTitle, 
    popupEventLocation, 
    popupEventBill, 
    tempEvent, 
    checkedResources
  ]);

  const deleteEvent = useCallback(
    (event) => {
      setMyEvents(myEvents.filter((item) => item.id !== event.id));
      setTempEvent(event);
      setSnackbarOpen(true);
    },
    [myEvents],
  );

  const loadPopupForm = useCallback((event) => {
    setTitle(event.title);
    setLocation(event.location);
    setBill(event.cost);
    setNotes(event.notes);
    setDate([event.start, event.end]);
    setCheckedResources(event.resource);
  }, []);

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const locationChange = useCallback((ev) => {
    setLocation(ev.target.value);
  }, []);

  const billChange = useCallback((ev) => {
    setBill(+ev.target.value || 0);
  }, []);

  const notesChange = useCallback((ev) => {
    setNotes(ev.target.value);
  }, []);

  const dateChange = useCallback((args) => {
    console.log(args);
    setDate(args.value);
  }, []);

  const handleDeleteClick = useCallback(() => {
    deleteEvent(tempEvent);
    setPopupOpen(false);
  }, [deleteEvent, tempEvent]);

  const handleEventClick = useCallback(
    (args) => {
      console.log('editado 1');
      setEdit(true);
      setTempEvent({ ...args.event });
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventCreated = useCallback(
    (args) => {
      const endDate = new Date(args.event.end);
  
      const endHour = endDate.getHours();
      
      setEdit(false);
      setTempEvent(args.event);
      loadPopupForm(args.event);
      setAnchor(args.target);
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent],
  );

  const headerText = useMemo(() => (isEdit ? 'Editar Reserva' : 'Nueva Reserva'), [isEdit]);

  const validateForm = () => {
    const newErrors = {};
  
    console.log(popupEventDate);

    if (!popupEventTitle || popupEventTitle.trim() === "") {
      newErrors.title = "El título es obligatorio";
    }
  
    if (!popupEventLocation || popupEventLocation.trim() === "") {
      newErrors.location = "La ubicación es obligatoria";
    }
  
    if (!popupEventBill || popupEventBill.toString().trim() === "") {
      newErrors.bill = "La factura es obligatoria";
    }
  
    if (!popupEventNotes || popupEventNotes.trim() === "") {
      newErrors.notes = "Las notas son obligatorias";
    }
    if (!popupEventDate || popupEventDate.length !== 2) {
      newErrors.date = "Selecciona un rango de fechas válido";
    }

    const endDate = new Date(popupEventDate[0])
    const endHour = endDate.getHours();
    
    if (endHour >= 12) {
      console.log("La hora de finalización no debe ser después de las 12 PM");
      newErrors.date = "No se pueden hacer check-out despues de las 12 PM";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        'cancel',
        {
          handler: () => {
            saveEvent();
          },
          keyCode: 'enter',
          text: 'Guardar',
          cssClass: 'mbsc-popup-button-primary',
        },
      ];
    } else {
      return [
        'cancel',
        {
          handler: () => {
            saveEvent();
          },
          keyCode: 'enter',
          text: 'Añadir',
          cssClass: 'mbsc-popup-button-primary',
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const handlePopupClose = useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setPopupOpen(false);
  }, [isEdit, myEvents]);

  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  const extendMyDefaultEvent = useCallback(
    () => ({
      title: 'Nueva Reserva',
      location: '',
      cost: 0,
    }),
    [],
  );

  const myScheduleEvent = useCallback(
    (event) => (
      <div>
        {event.title}
      </div>
    )
  );

  return (
    <div>
      <Eventcalendar
        className="md-work-order-scheduling"
        view={viewSettings}
        data={myEvents}
        ref={calInst}
        resources={myResources}
        clickToCreate="double"
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        dragTimeStep={30}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
        extendDefaultEvent={extendMyDefaultEvent}
        renderScheduleEventContent={myScheduleEvent}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        responsive={responsivePopup}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={popupEventTitle} onChange={titleChange} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
          <Input label="Location" value={popupEventLocation} onChange={locationChange} />
          {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
          <Input label="Bill to customer ($)" value={popupEventBill} onChange={billChange} />
          {errors.bill && <p style={{ color: 'red' }}>{errors.bill}</p>}
          <Textarea label="Notes" value={popupEventNotes} onChange={notesChange} />
          {errors.notes && <p style={{ color: 'red' }}>{errors.notes}</p>}
        </div>
        <div className="mbsc-form-group">
          <Input ref={startRef} label="Check-in" />
          <Input ref={endRef} label="Check-out" />
          <Datepicker
            select="range"
            controls={['time']}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            onChange={dateChange}
            value={popupEventDate}
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
        </div>
        <div className="mbsc-form-group">
          {isEdit && (
            <div className="mbsc-button-group">
              <Button className="mbsc-button-block" color="danger" variant="outline" onClick={handleDeleteClick}>
                Eliminar Reserva
              </Button>
            </div>
          )}
        </div>
      </Popup>
      <Snackbar message="Event deleted" isOpen={isSnackbarOpen} onClose={handleSnackbarClose} button={snackbarButton} />
    </div>
  );
}

export default App;
