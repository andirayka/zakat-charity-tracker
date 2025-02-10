# Zakat Tracker

Zakat Tracker is a modern web application that helps Muslims calculate their annual Zakat obligations accurately and efficiently. Built with Next.js and React, it provides a user-friendly interface for calculating Zakat based on various assets and generates detailed PDF reports.

## Features

- Simple and intuitive Zakat calculation interface
- Automatic calculation based on current Nisab threshold
- PDF export functionality for record-keeping
- Responsive design that works on all devices
- Modern UI built with Tailwind CSS

## Demo

Visit [Zakat Tracker](https://zakat-tracker.vercel.app) to try the application.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/zakat-tracker.git
cd zakat-tracker
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Enter your annual income in the designated field
2. Add your total savings
3. (Optional) Add any additional notes
4. Click "Calculate" to see your Zakat obligation

### Example Calculation

- Annual Income: $50,000
- Total Savings: $10,000
- Total Assets: $60,000
- Nisab Threshold: $5,100 (approximate)
- Zakat Due: $1,500 (2.5% of total assets)

### Exporting Reports

1. After calculating your Zakat, click the "Export to PDF" button
2. A PDF document will be generated with:
   - Calculation details
   - Date of calculation
   - Your notes (if any)
   - Total Zakat amount

## Contributing

We welcome contributions to improve Zakat Tracker! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Improvement

- Add support for different currencies
- Implement historical calculation tracking
- Add more asset types for calculation
- Improve PDF report customization
- Add multi-language support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [jsPDF](https://github.com/MrRio/jsPDF)
