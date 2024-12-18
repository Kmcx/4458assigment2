const Listing = require('../models/Listing');

// Yeni ilan oluştur
exports.createListing = async (req, res) => {
  const { title, no_of_people, country, city, price, from_date, to_date } = req.body;

  try {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    if (startDate >= endDate) {
      return res.status(400).json({ msg: 'from_date must be earlier than to_date' });
    }

    const listing = new Listing({
      hostId: req.user.id,
      title,
      no_of_people,
      country,
      city,
      price,
      from_date: startDate,
      to_date: endDate,
    });

    await listing.save();
    res.status(201).json({ status: 'successful', listing });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Kullanıcı ilanlarını getir
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ hostId: req.user.id });
    res.json({ listings });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.searchListings = async (req, res) => {
  const { title, from_date, to_date, country, city, no_of_people } = req.query;

  try {
    let query = {};

    // Parametreler varsa filtrele
    if (title) query.title = { $regex: title, $options: 'i' };
    if (country) query.country = country;
    if (city) query.city = city;
    if (no_of_people) query.no_of_people = { $gte: Number(no_of_people) };

    // Tarih aralığı kontrolü
    if (from_date && to_date) {
      query.from_date = { $lte: new Date(to_date) };
      query.to_date = { $gte: new Date(from_date) };
    }

    // Filtreler olmadan tüm kayıtları döndür
    const listings = await Listing.find(query).select('-__v'); // Fazla bilgiyi hariç tut
    res.status(200).json({ listings });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// İlan silme
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing || listing.hostId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Listing not found or unauthorized' });
    }

    await listing.remove();
    res.json({ status: 'successful', message: 'Listing deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
