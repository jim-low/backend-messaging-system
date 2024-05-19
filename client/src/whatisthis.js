(async() => {
  const result = await fetch('http://localhost:5000/whatisthis').then(res => res.json()).catch(err => console.log(err))
  console.log(result)
})()
