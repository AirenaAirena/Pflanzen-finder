import { useNavigate } from 'react-router-dom'
import profileIcon from '../assets/img/sett1.svg'
import notificationsIcon from '../assets/img/starset2.svg'
import privacyIcon from '../assets/img/set3.svg'
import helpIcon from '../assets/img/set4.svg'
import PageHeader from '../components/PageHeader'
import '../styles/SettingsPage.css'

import plantIcon from '../assets/img/plant.png'

function SettingsPage() {
  const navigate = useNavigate()
  const settingsItems = [
    { icon: profileIcon, label: 'Tell Friends' },
    { icon: notificationsIcon, label: 'Rate and Review' },
    { icon: privacyIcon, label: 'Privacy' },
    { icon: helpIcon, label: 'More apps' },
  ]
  return (
    <div className="settings">
      <PageHeader title="Setting" />
      <div className="settings-content">
        <div className="settings-logo" onClick={() => navigate('/identify')}>
          <img src={plantIcon} alt="plant" />
          <p>Plant Identifier</p>
        </div>

        <ul className="settings-menu">
          {settingsItems.map((item, index) => (
            <li key={index} className="settings-item">
              <img src={item.icon} alt="" className="settings-icon" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SettingsPage
