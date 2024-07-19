const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post('/canciones', (req, res) => {
    const newSong = req.body;
  
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
      if (err) throw err;
      const songs = JSON.parse(data);
      songs.push(newSong);
  
      fs.writeFile('repertorio.json', JSON.stringify(songs, null, 2), (err) => {
        if (err) throw err;
        res.status(201).send('Canción agregada');
      });
    });
  });

  
  app.get('/canciones', (req, res) => {
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  
  app.put('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedSong = req.body;
  
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
      if (err) throw err;
      let songs = JSON.parse(data);
      const songIndex = songs.findIndex(song => song.id === id);
  
      if (songIndex !== -1) {
        songs[songIndex] = { ...songs[songIndex], ...updatedSong };
        fs.writeFile('repertorio.json', JSON.stringify(songs, null, 2), (err) => {
          if (err) throw err;
          res.send('Canción actualizada');
        });
      } else {
        res.status(404).send('Canción no encontrada');
      }
    });
  });

  app.delete('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
      if (err) throw err;
      let songs = JSON.parse(data);
      songs = songs.filter(song => song.id !== id);
  
      fs.writeFile('repertorio.json', JSON.stringify(songs, null, 2), (err) => {
        if (err) throw err;
        res.send('Canción eliminada');
      });
    });
  });
  