import EventTable from '@/components/admin/EventTable';
import Title from '@/components/admin/Title';
import React from 'react';

const EventPage = () => {
    return (
        <div>
            <Title title='Event Table'/>
            <EventTable/>
        </div>
    );
}

export default EventPage;
