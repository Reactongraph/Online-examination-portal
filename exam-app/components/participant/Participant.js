import React from 'react';
import PageComponentTitle from '../common/PageComponentTitle';
import ParticipantTable from './ParticipantTable';

const Participant = ({participant_data }) => {
    return (
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <PageComponentTitle 
                title='PARTICIPANT'
                titleDescription='List, view and edit'
                buttonTitle='ADD PARTICIPANT'
                editForm = {false}
            />
        </div>

        <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
          
          <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
            <ParticipantTable participant_data ={participant_data }/>
          </div>
                    
        </section>
        
       
      </main>
    );
};

export default Participant;