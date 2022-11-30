import React from 'react';
import PageComponentTitle from '../common/PageComponentTitle';
import ModuleTable from './ModuleTable';

const Module = ({module_data}) => {
  //  console.log("The level_data "+ level_data);
   console.log(module_data);
    return (
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <PageComponentTitle 
                title='MODULE'
                titleDescription='List of all modules'
                buttonTitle='ADD NEW MODULE'
            />
        </div>

        <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
          
          <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
            <ModuleTable module_data={module_data} />
          </div>
                    
        </section>
        
       
      </main>
    );
};

export default Module;