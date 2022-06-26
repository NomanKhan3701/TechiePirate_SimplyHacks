import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultPhoto } from '../../utils'
import './Profile.scss'

const Profile = () => {
	const auth = useAuth()
	return (
		<div className='container profile-container page'>
			<div className='profile-cols'>
        <div className="left">
					<img src={getDefaultPhoto(auth)} />

          <div className='profile-info'>
            <span>
              <span></span>
            </span>
          </div>
        </div>

        <div className="right">
          <h1>Aditya Kharote</h1>
          <div className='profile-content'>Hi
          </div>
        </div>
      </div>
		</div>
	)
}

export default Profile