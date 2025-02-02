import axios from 'axios';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
}

function Job({ job, setApplyClicked }) {

    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 mb-2 rounded-md shadow-lg text-white max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-sm text-gray-200 mb-4">{job.description}</p>
        <div className="flex flex-col gap-2 text-gray-100">
          <span className="font-semibold">📍 Location: {job.location}</span>
          <span className="font-semibold">💰 Salary: ${job.salary.toLocaleString()}</span>
          <span className="font-semibold">📌 Category: {job.category}</span>
        </div>
        <button onClick={()=>{setApplyClicked(job._id)}} className="mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all">
          Apply Now
        </button>
      </div>
    );
  }

export const Jobs = ()=> {
    const [applyClicked, setApplyClicked] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/job/get-all')
            .then(response => setJobs(response.data.data))
            .catch(err => console.log(err))
    }, [jobs])

    useEffect(()=>{
      
        if(submitForm)
            axios.post(`http://localhost:3000/job/apply/${applyClicked}`, submitForm)
            .then(response => {
                setSubmitForm(false);
                alert(response.data.message);
            })
            .catch(err => {
                setSubmitForm(false);
                alert(err.response.data.message);
            })
    }, [submitForm])

    const handleSubmission = (e)=>{
      e.preventDefault();
      setSubmitForm({
          name: e.target[0].value,
          email: e.target[1].value,
          resume: e.target[2].files[0]
      })
  }

    return (
      <>
        
          {applyClicked
          ?<form onSubmit={handleSubmission} className='w-full h-full overflow-hidden bg-gray-700 flex flex-col items-center justify-center z-50'>
            <input name="name" type="text" placeholder="Name" required className="block w-full p-2 border border-gray-300 rounded-md mb-2" />
            <input name="email" type="email" placeholder="Email" required className="block w-full p-2 border border-gray-300 rounded-md mb-2" />
            <input name="resume" type="file" placeholder="Resume" required className="block w-full p-2 border border-gray-300 rounded-md mb-2" />
            <button type="submit" className=" cursor-pointer block w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all">Submit</button>
          </form>
        
        :<Masonry className={`flex h-full w-full gap-2 bg-gray-700`} breakpointCols={breakpointColumnsObj}>
            {
              jobs.map(job => <Job key={job._id} job={job} setApplyClicked={setApplyClicked} />)
            }
        </Masonry>}
      </>
    )
}