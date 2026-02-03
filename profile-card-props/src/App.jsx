import './App.css'

function App(props) {
  return (
    <>
      <div className="card outer">
        <img
          src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
          alt="Profile"
        />

        <div className="card-body header">
          <h4>{props.Name}</h4>
          <p>{props.Add}</p>
          <p>{props.Post}</p>

          <div className="btn-group mt-2">
            <button className="btn btn-outline-primary msg">
              Message
            </button>
            <button className="btn btn-outline-primary">
              Follow
            </button>
          </div>
        </div>

        <hr />

        <div className="skills-section"> 
          <h6 className="skill">Skills</h6>
          <table>
            <tbody>
              <tr>
                <td>{props.Skill1}</td>
                <td colSpan={2}>{props.Skill2}</td>
                <td>{props.Skill3}</td>
              </tr>
              <tr>
                <td>{props.Skill4}</td>
                <td>{props.Skill5}</td>
                <td>{props.Skill6}</td>
                <td>{props.Skill7}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
