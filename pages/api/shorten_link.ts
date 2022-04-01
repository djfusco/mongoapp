import { connectToDatabase } from "./_connector";

var hash = require('object-hash');


export default async (req, res) => {
  const db = await connectToDatabase();

  if (req.body !== '' && req.body.link !== undefined && req.body.link !== '') {
    //const entry = await db.db('links_db').collection('links_collection').insertOne({ link: req.body.link });

    const valueGUID = hash(req.body.link, {algorithm: 'md5'});
    
    const entry = await db.db('links_db').collection('links_collection').updateOne(
      //{link: req.body.link},
      //{_id: "DJF3"}, 
      {_id: req.body.link}, 
      //{$set: {GUID: '12AB34'} },
      {$set: {GUID: valueGUID} },
      {upsert: true}  
      );

    res.statusCode = 201;
    //return res.json({ short_link: `${process.env.VERCEL_URL}/r/${entry.insertedId}` });
     
    ///return res.json({ short_link: `${valueGUID}` });
    return res.json({ GUID: `${valueGUID}` });

  }

  res.statusCode = 409;
  res.json({ error: 'no_link_found', error_description: 'No link found'})
}