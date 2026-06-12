const categorySelect = document.querySelector("#category");
const barCanvas = document.querySelector("#barChart");
const lineCanvas = document.querySelector("#lineChart");

const months = [ "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Верересень", "Жовтень", "Литопад", "Грудень"];

const salesData ={
  electronics: {
    label:"Електроніка",
    monthly: [42000, 38000, 45000, 47000, 52000, 61000, 59000, 64000, 70000, 76000, 88000, 105000],
    year2024: [35000, 33000, 39000, 41000, 46000, 52000, 50000, 56000, 62000, 68000, 77000, 90000],
    year2025: [42000, 38000, 45000, 47000, 52000, 61000, 59000, 64000, 70000, 76000, 88000, 105000]
  },
  clothes: {
    label: "Одяг",
    monthly: [26000, 24000, 30000, 34000, 39000, 42000, 45000, 47000, 51000, 56000, 62000, 69000],
    year2024: [22000, 21000, 26000, 30000, 34000, 37000, 39000, 42000, 45000, 49000, 53000, 58000],
    year2025: [26000, 24000, 30000, 34000, 39000, 42000, 45000, 47000, 51000, 56000, 62000, 69000]
  },
  books: {
    label: "Книги",
    monthly: [12000, 11000, 13500, 14000, 15000, 16000, 15500, 17000, 21000, 23000, 26000, 31000],
    year2024: [10000, 9500, 12000, 12500, 13000, 14000, 13800, 15000, 18000, 19500, 22000, 26000],
    year2025: [12000, 11000, 13500, 14000, 15000, 16000, 15500, 17000, 21000, 23000, 26000, 31000]
  }
};

const startCategory = salesData.electronics;

const barChart = new Chart(barCanvas, {
  type: "bar",
  data: {
    labels: months,
    datasets: [
      {
        label: `Продажі: ${startCategory.label}`,
        data: startCategory.monthly
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} грн`
        }
      },
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const lineChart = new Chart(lineCanvas, {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "2024",
        data: startCategory.year2024
      },
      {
        label: "2025",
        data: startCategory.year2025
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} грн`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  const data = salesData[selectedCategory];

  barChart.data.datasets[0].label = `Продажі: ${data.label}`;
  barChart.data.datasets[0].data = data.monthly;
  barChart.update();

  lineChart.data.datasets[0].data = data.year2024;
  lineChart.data.datasets[1].data = data.year2025;
  lineChart.update();
});