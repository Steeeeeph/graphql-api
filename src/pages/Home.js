import React from 'react'
export default function Home() {
    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}
/*
<Background>
<Layout>
  <SEO title="Home" />
      <div className="landingDiv">
              <div className="welcome">
                  <div className="mainLanding">
                      <div className="landingTitle">
                          <Typewriter
                              onInit={(typewriter) => {
                                  typewriter.typeString('Create magic')
                                      .pauseFor(2500)
                                      .deleteChars(5)
                                      .typeString('your magic')
                                      .start();
                              }}

                          />
                      </div>
                      <h2 className="landingSubt">Welcome to Witchypedia, your source for everything spell related</h2>
                      <Link to={"/crystals"}><button className="tagLink indexButton"><Gem /><p>Check it out</p> </button></Link>
                  </div>
                  <div className="landingImage" style={{ position: 'relative'}}>
                      <StaticImage src="../images/nebula_bottle.png" alt="magic bottle" placeholder="blurred" className="bottleImage"/>
                      <Sparkle
                          minSize={3}
                          maxSize={6}
                          count={90}
                          fadeOutSpeed={1}
                          flickerSpeed={'slowest'}
                      />
                  </div>
              </div>
          <div className="textBox">
              <p className="landingText">
                  Here you can find all the useful information about crystals and herbs (coming soon!), handily organised by category.
                  You can even create you own online grimoire so you never lose your notes again.
              </p>
              <div className="landingCards">
                  <div className="card">
                      <StaticImage src="../images/crystals.jpg" alt="crystals" className="cardImage" />
                      <p>Check out which crystal you need for support and spells here!</p>
                  </div>
                  <div className="card">
                      <StaticImage src="../images/herbs.jpg" alt="herbs" className="cardImage" />
                      <p>Check out which crystal you need for support and spells here!</p>
                  </div>
                  <div className="card">
                      <StaticImage src="../images/grimoire.jpg" alt="grimoire" className="cardImage" />
                      <p>Check out which crystal you need for support and spells here!</p>
                  </div>
              </div>
          </div>
      </div>
</Layout>
</Background>
*/