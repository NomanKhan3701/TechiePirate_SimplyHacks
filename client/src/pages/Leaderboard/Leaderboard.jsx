import './Leaderboard.scss'
import {TbPlant2} from 'react-icons/tb'
import {FaDonate} from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import FullScreenLoader from '../Signup/FullScreenLoader';
import { Link } from 'react-router-dom';

const server_url = process.env.REACT_APP_server_url

export default function Leaderboard() {

  const [loading, setLoading] = useState(true);
	const [leaderboard, setLeaderboard] = useState(null);
	const auth = useAuth()

	const getLeaderboard = async () => {
		try {
			setLoading(true)
			const res = await axios.get(`${server_url}/api/leaderboard`);
      const data = res.data

      data.sort((a, b) => {
        if (a.workPts !== b.workPts) return b.workPts - a.workPts
        return b.resourcePts - a.resourcePts
      })

			setLeaderboard(data)
			setLoading(false)
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		setLoading(true)
		getLeaderboard();
		setLoading(false)
	}, [])

	if (loading || !leaderboard) {
		return <FullScreenLoader></FullScreenLoader>
	}

  return (
    <div className='container page'>
      <h1>Leaderboard</h1>

      <div className='leaders-list'>
        {
          leaderboard.map((item, i) => {
            return <LeaderCard leader={item} rank={i}></LeaderCard>
          })
        }
      </div>
    </div>
  )
}

function LeaderCard({rank, leader}) {
  return (
    <Link to={'/profile/' + leader.email} className='leader-item'>
      <span>{rank + 1}.</span>
      <div>
        {leader.firstName + ' ' + leader.lastName}
        <div>
          <TbPlant2></TbPlant2>
          <span>{leader.workPts}</span>
          <FaDonate />
          <span>{leader.resourcePts}</span>
        </div>
      </div>
    </Link>
  )
}