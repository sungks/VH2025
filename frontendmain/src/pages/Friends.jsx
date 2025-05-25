function Friends() {
  const mockFriends = ['Alice 🌟', 'Bob 🧠', 'Charlie 🎨'];
  const mockGroups = ['Study Buddies 📚', 'Hackathon Team 💻'];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👥 Your Friends</h2>
      <ul>
        {mockFriends.map(f => <li key={f}>{f}</li>)}
      </ul>
      <h2>🌐 Your Groups</h2>
      <ul>
        {mockGroups.map(g => <li key={g}>{g}</li>)}
      </ul>
    </div>
  );
}

export default Friends;
