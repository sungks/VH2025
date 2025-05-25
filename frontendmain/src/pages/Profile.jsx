import './Profile.css';
import avatar from '../assets/OIP.jpg'; // path may vary slightly depending on folder structure

function Profile() {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="avatar-container">
                    <img src={avatar} alt="Profile" className="avatar" />
                </div>
            </div>

            <div className="profile-info">
                <h2 className="name">Jane Doe</h2>
                <p className="title">Advisor and Consultant at Venus Hacks Inc.</p>
                <p className="location">📍 Irvine, California</p>

                <div className="contact-info">
                    <p>📞 +79110018830 (Office)</p>
                    <p>📱 +79667141177 (Mobile)</p>
                    <p>📧 jane.doe@vh.com</p>
                </div>

                <div className="social-links">
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">Instagram</a>
                </div>

                <button className="chat-btn">💬 Chat</button>

                <div className="rating">
                    <p>⭐ 4.5 (153 reviews)</p>
                </div>
            </div>

            <div className="profile-cards">
                <div className="card intro-card">
                    <h3>Introduction</h3>
                    <div className="video-placeholder">🎥 Video Here</div>
                </div>
                <div className="card side-card">
                    <h3>Loan Calculator</h3>
                    <p>Get great rates and an effortless close.</p>
                    <button className="calculator-btn">Calculator</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
