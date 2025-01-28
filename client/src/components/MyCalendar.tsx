// src/components/Calendar.js
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { API } from '../constants/axiosInstance';
import Modal from './Modal';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState<any>({ title: '', start: null, end: null });
    const [selectedEvent, setSelectedEvent] = useState(null);


    useEffect(() => {
        fetchTimeslots();
    }, []);

    const fetchTimeslots = async () => {
        try {
            const { data } = await API.get('/timeslots');
            const formattedEvents = data.data?.map((slot: any) => ({
                start: new Date(slot.start),
                end: new Date(slot.end),
                title: slot.title,
                id: slot._id,
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching timeslots:', error);
        }
    };

    const handleSelectSlot = ({ start, end }: any) => {
        setNewEvent({ ...newEvent, start, end });
        setSelectedEvent(null); // Ensure no selected event for creating new event
        setShowModal(true); // Open the modal to gather title input
    };

    const handleSaveEvent = async () => {
        try {
            const { data } = await API.post('/timeslots', {
                start: newEvent.start,
                end: newEvent.end,
                title: newEvent.title,
            });
            const res = data.data;
            if (res) {
                toast.success('Interveiw has scheduled');
                setEvents([...events, {
                    start: new Date(res.start),
                    end: new Date(res.end),
                    title: res.title,
                    id: res._id
                }]);
                setShowModal(false); // Close the modal
                setNewEvent({ title: '', start: null, end: null }); // Reset the new event
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if(error.response?.data.message){
                    toast.warning(error.response?.data.message)
                }
            }

            console.error('Error saving event:', error);
        }
    };

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event); // Set the selected event for updating
        setNewEvent(event); // Load the selected event into the form
        setShowModal(true); // Open the modal to edit the event
    };

    const handleUpdateEvent = async () => {
        try {
            await API.put(`/timeslots`, {
                start: newEvent.start,
                end: newEvent.end,
                title: newEvent.title,
            }, { params: { id: newEvent.id } });

            setEvents((prevEvents: any) =>
                prevEvents.map((evt: any) =>
                    evt.id === newEvent.id ? { ...newEvent } : evt
                )
            );
            setShowModal(false); // Close the modal
            setNewEvent({ title: '', start: null, end: null }); // Reset the new event
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async (event: any) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const { data } = await API.delete(`/timeslots`, {
                    params: {
                        id: event.id
                    }
                });
                if (data.data) {
                    toast.success('Interview deleted successfully')
                    setEvents((prevEvents: any) => prevEvents.filter((evt: any) => evt.id !== event.id));
                } else {
                    toast.error('Error while deleting')
                }
            } catch (error) {
               
                console.error('Error deleting event:', error);
            }
        }
    };


    return (
        <div style={{ height: '620px', width: '100%', zIndex: 50, }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => {
                    const action = window.prompt(
                        `Type 'update' to edit or 'delete' to remove the event.`
                    );

                    if (action === 'update') {
                        handleSelectEvent(event); // Update the event
                    } else if (action === 'delete') {
                        handleDeleteEvent(event); // Delete the event
                    }
                }}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2 className='text-xl'>Create New Event</h2>
                    <div>
                        <label className='text-xl'>
                            Title:
                            <input
                                type="text"
                                className='border rounded  w-full px-2'
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </label>
                    </div>
                    <div className='text-xl w-full flex flex-col'>
                        <label>
                            Start
                        </label>
                        <input
                            className='border rounded px-2'
                            type="datetime-local"
                            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => {

                                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
                            }}
                        />
                    </div>
                    <div className='text-xl w-full flex flex-col'>
                        <label>
                            End:
                        </label>
                        <input
                            type="datetime-local"
                            className='border rounded px-2'
                            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => {

                                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                            }}
                        />
                    </div>
                    <button
                        className="mr-3 bg-green-500 px-3 py-1 font-bold rounded-md text-white"
                        onClick={() => {
                            if (selectedEvent) {
                                handleUpdateEvent(); // Call update function
                            } else {
                                handleSaveEvent(); // Call save function
                            }
                        }}
                    >
                        {selectedEvent ? 'Update Event' : 'Save Event'}
                    </button>

                    <button
                        className="mr-3 bg-black px-3 py-1 font-bold rounded-md text-white"
                        onClick={() => setShowModal(false)}>Cancel</button>
                </Modal>
            )
            }
        </div >
    );
};

export default MyCalendar;