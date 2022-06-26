import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultPhoto } from '../../utils'
import './Profile.scss'
import { AiFillMail, AiFillPhone } from 'react-icons/ai'
import { TbPlant2 } from 'react-icons/tb'
import { FaDonate } from 'react-icons/fa'
import { useParams } from 'react-router'
import FullScreenLoader from '../Signup/FullScreenLoader'
import axios from 'axios'

const server_url = process.env.REACT_APP_server_url

const Profile = () => {
	const {email} = useParams()
	const [profile, setProfile] = useState(null)

	useEffect(() => {
		const getProfile = async () => {
			try {
				const res = await axios.get(`${server_url}/api/auth/profile?email=${email}`);
				setProfile(res.data)
			} catch (e) {
				console.log(e);
			}
		}
		
		getProfile()
	}, [email])

	if (!profile) {
		return <FullScreenLoader></FullScreenLoader>
	}

	return (
		<div className='container profile-container page'>
			<div className='profile-cols'>
        <div className="left">
					<img src={getDefaultPhoto(profile)} />

          <div className='profile-info'>
            <span>
							<i><AiFillMail></AiFillMail></i>
              <span>{profile.email}</span>
            </span>

            <span>
							<i><AiFillPhone></AiFillPhone></i>
              <span>+91 9876543210</span>
            </span>
          </div>
        </div>

        <div className="right">
          <h1>{profile.firstName + ' ' + profile.lastName}</h1>
          <div className='profile-content'>
						<div className='scores'>
							<div>
								<TbPlant2></TbPlant2>
								<span>{profile.workPts}</span>
							</div>
							
							<div>
								<FaDonate></FaDonate>
								<span>{profile.resourcePts}</span>
							</div>
						</div>

						<div className='profile-sec'>
							<h3>Events Joined</h3>
							<div className='pitems-grid'>

							</div>
						</div>

						<div className='profile-sec'>
							<h3>Donations</h3>
							<div className='pitems-grid'>
								
							</div>
						</div>

          </div>
        </div>
      </div>
		</div>
	)
}

export default Profile