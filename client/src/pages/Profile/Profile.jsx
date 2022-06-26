import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultPhoto } from '../../utils'
import './Profile.scss'
import { AiFillMail, AiFillPhone } from 'react-icons/ai'
import { TbPlant2 } from 'react-icons/tb'
import { FaDonate } from 'react-icons/fa'

const Profile = () => {
	const auth = useAuth()
	
	return (
		<div className='container profile-container page'>
			<div className='profile-cols'>
        <div className="left">
					<img src={getDefaultPhoto(auth)} />

          <div className='profile-info'>
            <span>
							<i><AiFillMail></AiFillMail></i>
              <span>adityakharote@hotmail.com</span>
            </span>

            <span>
							<i><AiFillPhone></AiFillPhone></i>
              <span>+91 9876543210</span>
            </span>
          </div>
        </div>

        <div className="right">
          <h1>Aditya Kharote</h1>
          <div className='profile-content'>
						<div className='scores'>
							<div>
								<TbPlant2></TbPlant2>
								<span>0</span>
							</div>
							
							<div>
								<FaDonate></FaDonate>
								<span>0</span>
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