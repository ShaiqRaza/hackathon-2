import axios from 'axios';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
}

function Job({ job }) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 mb-2 rounded-md shadow-lg text-white max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-sm text-gray-200 mb-4">{job.description}</p>
        <div className="flex flex-col gap-2 text-gray-100">
          <span className="font-semibold">📍 Location: {job.location}</span>
          <span className="font-semibold">💰 Salary: ${job.salary.toLocaleString()}</span>
          <span className="font-semibold">📌 Category: {job.category}</span>
        </div>
        <button className="mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all">
          Apply Now
        </button>
      </div>
    );
  }

export const Jobs = ()=> {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/job/get-all')
            .then(response => setJobs(response.data.data))
            .catch(err => console.log(err))
    }, [jobs])
    return (
        <Masonry className="flex w-full gap-2" breakpointCols={breakpointColumnsObj}>
            {
              jobs.map(job => <Job key={job._id} job={job} />)
            }
        </Masonry>
    )
}