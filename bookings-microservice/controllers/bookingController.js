const Booking = require('../models/Booking');
const Listing = require('../../listings-microservice/models/Listing');

// Yeni rezervasyon oluştur
exports.createBooking = async (req, res) => {
  const { listingId, from_date, to_date, guest_names } = req.body;

  try {
    // İlanın mevcut olup olmadığını kontrol et
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    // Tarihler uygun mu?
    const fromDate = new Date(from_date);
    const toDate = new Date(to_date);
    if (fromDate >= toDate) {
      return res.status(400).json({ msg: 'Invalid date range' });
    }

    // Çakışan rezervasyon var mı kontrol et
    const overlappingBooking = await Booking.findOne({
      listingId,
      $or: [
        { from_date: { $lte: toDate, $gte: fromDate } },
        { to_date: { $gte: fromDate, $lte: toDate } },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({ msg: 'Listing is unavailable for the selected dates' });
    }

    // Yeni rezervasyon oluştur
    const booking = new Booking({
      listingId,
      guestId: req.user.id,
      from_date: fromDate,
      to_date: toDate,
      guest_names,
    });

    await booking.save();
    res.status(201).json({ status: 'successful', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Kullanıcının rezervasyonlarını getir
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ guestId: req.user.id }).populate('listingId', 'title country city price');
    res.json({ bookings });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Tüm rezervasyonları getir (admin için)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('listingId', 'title country city price');
    res.json({ bookings });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
