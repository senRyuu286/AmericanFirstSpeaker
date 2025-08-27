const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample speaker data
const speakers = [
  {
    id: 1,
    name: "Tucker Carlson",
    title: "Founder and Host of The Tucker Carlson Show",
    image: "/images/tucker.png",
    bio: "Tucker Carlson is a renowned political commentator and media personality known for his insightful analysis and fearless approach to journalism.",
    featured: true
  },
  {
    id: 2,
    name: "Candace Owens",
    title: "Political Commentator and Author",
    image: "/images/655a0abc-1720-40ae-ae68-7b4216e29e99.png",
    bio: "Candace Owens is a prominent conservative voice, author, and political activist dedicated to promoting individual liberty and traditional values.",
    featured: true
  },
  {
    id: 3,
    name: "Ben Shapiro",
    title: "Editor Emeritus of The Daily Wire",
    image: "/images/3366ff46-23e1-49b4-bbff-b22216794bf2.png",
    bio: "Ben Shapiro is a bestselling author, lawyer, and one of the most influential conservative voices in America.",
    featured: true
  },
  {
    id: 4,
    name: "Charlie Kirk",
    title: "Founder and President of Turning Point USA",
    image: "/images/5fc87dc6-7f99-4d79-b614-441808974466.png",
    bio: "Charlie Kirk is a prominent young conservative leader dedicated to promoting free markets and limited government on college campuses.",
    featured: true
  },
  {
    id: 5,
    name: "Laura Ingraham",
    title: "Host of The Ingraham Angle",
    image: "/images/f74f7af7-4bc4-43c7-8da5-a97718e72932.png",
    bio: "Laura Ingraham is a bestselling author and the host of The Ingraham Angle on Fox News Channel.",
    featured: false
  },
  {
    id: 6,
    name: "Mark Levin",
    title: "Host of Life, Liberty & Levin",
    image: "/images/06606f22-7c0f-4002-856b-4a050d281664.png",
    bio: "Mark Levin is a constitutional lawyer, bestselling author, and host of one of America's top radio shows.",
    featured: false
  }
];

// Routes
app.get('/', (req, res) => {
  const featuredSpeakers = speakers.filter(speaker => speaker.featured);
  res.render('index', { featuredSpeakers });
});

app.get('/speakers', (req, res) => {
  res.render('speakers', { speakers });
});

app.get('/speaker/:id', (req, res) => {
  const speaker = speakers.find(s => s.id === parseInt(req.params.id));
  if (speaker) {
    res.render('speaker-detail', { speaker });
  } else {
    res.status(404).send('Speaker not found');
  }
});

app.get('/pricing', (req, res) => {
  res.render('pricing');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // In a real application, you would handle the form submission here
  console.log('Contact form submission:', { name, email, message });
  res.render('contact', { success: true });
});

app.get('/video-intro', (req, res) => {
  res.render('video-intro');
});

// API endpoints
app.get('/api/speakers', (req, res) => {
  res.json(speakers);
});

app.get('/api/speaker/:id', (req, res) => {
  const speaker = speakers.find(s => s.id === parseInt(req.params.id));
  if (speaker) {
    res.json(speaker);
  } else {
    res.status(404).json({ error: 'Speaker not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});