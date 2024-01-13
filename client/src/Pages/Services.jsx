import { useAuth } from "../store/auth"

const Services = () => {
  const { services } = useAuth()
  // console.log(services)

  return (
    <section className='services-section'>
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {
          services.map((e) => {
            const { provider, price, service, description } = e
            return (
              <div className="card" key={e._id}>
                <div className="card-image">
                  <img src="/images/design.png" alt="service img" width='300' />
                </div>
                <div className="card-details" >
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>${price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>)
          })
        }
      </div>
    </section>
  )
}

export default Services