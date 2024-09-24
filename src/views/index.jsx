import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from "react-infinite-scroll-component"
import "./index.css"
import Logo from "../assets/logo.webp"
import axios from 'axios';


function DefaultSeed() {
  let seed = localStorage.getItem("seed");
  if (seed === null) {
    seed = Math.floor(100000 + Math.random() * 900000)
    localStorage.setItem("seed", seed)
  }
  return seed;
}

function DefaultProbability(){
  let probability = localStorage.getItem("probability");
  if(probability == null) {
    probability = 0
    localStorage.setItem("probability", probability)
  }
  return +probability
}

function DefaultRegion(){
  let region = localStorage.getItem("region");
  if(region == null) {
    region = "MXN"
    localStorage.setItem("region", region)
  }
  return region
}

export default function Index() {
  const [users, setUsers] = useState([])
  const [region, setRegion] = useState(() => DefaultRegion());
  const [seed, setSeed] = useState(() => DefaultSeed());
  const [probability, setProbability] = useState(() => DefaultProbability());
  const seeddata = useRef({});


  useEffect(() => {
    FetchInitial()
  }, [])

  useEffect(() => {
    RegeneratesScratch();
  }, [region]);


  //This is wrong, but idk how to fix it
  const GeneratesNewRandom = async () => {
    let newseed = Math.floor(100000 + Math.random() * 900000)
    setSeed(newseed)
    localStorage.setItem("seed", newseed)
    const result = await axios.post(`/api/generateData?seednumber=${newseed}&probability=${probability}&region=${region}`)
    setUsers(result.data.table)
    seeddata.current = result.data.seeddata
  }


  const handleKeyDown = (e) => {
    const charCode = e.which || e.keyCode;
    if (charCode >= 48 && charCode <= 57 || charCode == 8)
      return
    e.preventDefault();
  };

  //Fetchs again
  const RegeneratesScratch = async () => {
    localStorage.setItem("probability", probability)
    localStorage.setItem("region", region)
    localStorage.setItem("seed", seed)
    await FetchInitial()
  }

  //Fetch initial data
  const FetchInitial = async () => {
    const result = await axios.post(`/api/generateData?seednumber=${seed}&probability=${probability}&region=${region}`)
    setUsers(result.data.table)
    seeddata.current = result.data.seeddata
  }

  //Fetches more data
  const FetchData = async () => {
    const result = await axios.post(`/api/continue?probability=${probability}&region=${region}`, { seeddata: seeddata.current })
    setUsers([...users, ...result.data.table]);
    seeddata.current = result.data.seeddata
  }


  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top logo-navbar-pedrito" />
            RegisFlow
          </a>
          <div className='me-auto'>
            <span className="navbar-text">
               <a href="/" className="text-decoration-none">User Data Generation</a>
            </span>
          </div>
          <div>
            <span className="navbar-text">
              Welcome Pedro León!
            </span>
          </div>

        </div>
      </nav>
      <div className="container">
        <div className="d-flex flex-align-center justify-content-around gap-4 flex-wrap mt-5">


          <div className='d-flex'>
            <label className='label-pedrito me-2'>Region:</label>
            <select className='form-select' value={region} onChange={e => { setRegion(e.target.value);}}>
              <option value="MXN">Mexico</option>
              <option value="USA">USA</option>
              <option value="ITA">Italy</option>
            </select>
          </div>

          <div className='d-flex'>
            <label className='label-pedrito me-2'>Errors:</label>
            <input type="range" className="form-range label-pedrito" value={probability} onChange={(e) => setProbability(e.target.value)} onMouseUp={RegeneratesScratch} onTouchEnd={RegeneratesScratch}  min="0" step="100" max="1000"></input>
            <input onKeyDown={handleKeyDown} type='number' value={probability} onChange={(e) => setProbability(e.target.value)} onBlur={RegeneratesScratch} className='form-control ms-2 inputtexterrors-pedrito' />
          </div>

          <div className="d-flex">
            <label className='label-pedrito me-2'>Seed:</label>
            <input type="number" className="form-control inputtextseed-pedrito" value={seed} onChange={(e) => setSeed(e.target.value)} onBlur={RegeneratesScratch} placeholder="1234" />
            <button onClick={GeneratesNewRandom} className="btn btn-primary ms-2"><FontAwesomeIcon icon={faShuffle} size='lg' /></button>
          </div>
        </div>
        <div className="superbigtableusers border rounded table-responsive">
          <InfiniteScroll
            dataLength={users.length}
            next={FetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollThreshold={1}
          >
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Id</th>
                  <th>Random identifier</th>
                  <th>Full name</th>
                  <th>Address</th>
                  <th>Phone number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((x, i) => (
                  <tr key={x.at(0)}>
                    <td className='smalluuid'>{i+1}</td>
                    <td className='smalluuid'>{x.at(0)}</td>
                    <td>{x.at(1)}</td>
                    <td>{x.at(2)}</td>
                    <td>{x.at(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>

    </div>
  )
}