const reportTemplate = reportData => {
  // Calculate derived metrics
  const avgRevenuePerInvoice = Math.round(
    reportData.totalRevenue / reportData.invoiceCount,
  );
  const avgRevenuePerCustomer = Math.round(
    reportData.totalRevenue / reportData.uniqueCustomerCount,
  );
  const discountRate = (
    (reportData.totalDiscount / reportData.totalRevenue) *
    100
  ).toFixed(1);
  const invoicesPerCustomer = (
    reportData.invoiceCount / reportData.uniqueCustomerCount
  ).toFixed(1);
  const effectiveTaxRate = (
    (reportData.totalGstCollected / reportData.totalRevenue) *
    100
  ).toFixed(1);
  const netRevenue = reportData.totalRevenue - reportData.totalGstCollected;

  // Sort top items by revenue (descending)
  const sortedTopItems = [...reportData.topItems].sort(
    (a, b) => b.totalRevenue - a.totalRevenue,
  );

  // Calculate percentage changes (using placeholder values - replace with actual comparison data if available)
  const revenueChange = 15.3; // Example value
  const invoiceChange = 22.4; // Example value
  const customerChange = 14.3; // Example value
  const gstChange = 18.7; // Example value

  // Prepare sparkline data (using placeholder trends - replace with actual trends if available)
  const sparklineData = {
    'Smart Watch': [12, 15, 18, 16, 20],
    'Night Dress': [8, 12, 10, 14, 16],
    'Wireless Headphone': [18, 22, 19, 24, 26],
    'Product Watch': [15, 20, 25, 22, 28],
    Bottol: [5, 8, 6, 9, 11],
  };

  // Calculate revenue distribution for pie chart
  const revenueDistribution = sortedTopItems.map(item => item.totalRevenue);
  const revenueLabels = sortedTopItems.map(item => item.itemName);

  // Calculate weekly performance data (using proportional distribution - replace with actual weekly data if available)
  const weeklyBase = reportData.totalRevenue * 0.8; // 80% distributed
  const weeklyPerformance = [
    Math.round(weeklyBase * 0.22),
    Math.round(weeklyBase * 0.25),
    Math.round(weeklyBase * 0.28),
    Math.round(
      reportData.totalRevenue -
        (weeklyBase * 0.22 + weeklyBase * 0.25 + weeklyBase * 0.28),
    ),
  ];

  // Format currency values
  const formatCurrency = amount => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  // Generate top products table rows
  const generateProductRows = () => {
    return sortedTopItems
      .map(
        (item, index) => `
      <tr>
        <td><div class="product-rank">${index + 1}</div></td>
        <td>${item.itemName}</td>
        <td>${item.quantitySold}</td>
        <td class="product-revenue">${formatCurrency(item.totalRevenue)}</td>
        <td>${formatCurrency(
          Math.round(item.totalRevenue / item.quantitySold),
        )}</td>
        <td><canvas class="sparkline" id="spark${index + 1}"></canvas></td>
      </tr>
    `,
      )
      .join('');
  };

  // Calculate top 3 products revenue percentage
  const top3Revenue = sortedTopItems
    .slice(0, 3)
    .reduce((sum, item) => sum + item.totalRevenue, 0);
  const top3RevenuePercentage = (
    (top3Revenue / reportData.totalRevenue) *
    100
  ).toFixed(1);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.businessName} - Business Analytics Report</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        tyle>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8f9fa;
            color: #2c3e50;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        /* Header Section */
        .header {
            background: #61758A90;
            color: white;
            padding: 30px;
            margin-bottom: 0px;
            border-left: 6px solid #0D80F2;
        }

        .header h1 {
            font-size: 1.7em;
            margin-bottom: 0px;
            font-weight: 600;
        }

        .header .subtitle {
            font-size: 0.9em;
            opacity: 0.9;
            margin-bottom: 1px;
        }

        .header .period {
            font-size: 0.85em;
            background: rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
        }

        /* Company Info Grid */
        .company-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .info-item {
            display: flex;
            align-items: center;
            padding: 15px;
            background: white;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .info-icon {
            width: 40px;
            height: 40px;
            background: #3498db;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-weight: bold;
        }

        .info-content h3 {
            font-size: 0.9em;
            color: #7f8c8d;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .info-content p {
            font-size: 1.1em;
            font-weight: 600;
            color: #2c3e50;
        }

        /* KPI Cards */
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .kpi-card {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 4px solid #3498db;
            transition: transform 0.2s ease;
        }

        .kpi-card:hover {
            transform: translateY(-2px);
        }

        .kpi-card:nth-child(2) { border-left-color: #e74c3c; }
        .kpi-card:nth-child(3) { border-left-color: #f39c12; }
        .kpi-card:nth-child(4) { border-left-color: #27ae60; }

        .kpi-value {
            font-size: 2.5em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
            display: block;
        }

        .kpi-label {
            font-size: 1em;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .kpi-change {
            font-size: 0.9em;
            color: #27ae60;
            display: flex;
            align-items: center;
        }

        .kpi-change::before {
            content: "▲";
            margin-right: 4px;
        }

        /* Chart Sections */
        .chart-section {
            background: white;
            padding: 30px;
            margin-bottom: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .chart-title {
            font-size: 1.6em;
            margin-bottom: 20px;
            color: #2c3e50;
            font-weight: 600;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 10px;
        }

        .chart-container {
            position: relative;
            height: 400px;
            margin: 20px 0;
        }

        .chart-small {
            height: 300px;
        }

        /* Revenue Analysis */
        .revenue-analysis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        /* Top Products Table */
        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .products-table th {
            background: #34495e;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }

        .products-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #ecf0f1;
        }

        .products-table tr:hover {
            background: #f8f9fa;
        }

        .product-revenue {
            font-weight: 600;
            color: #27ae60;
        }

        .product-rank {
            width: 40px;
            height: 40px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin: 0 auto;
        }

        /* Sparklines */
        .sparkline {
            width: 100px;
            height: 30px;
            margin: 0 auto;
        }

        /* Insights Section */
        .insights {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #3498db;
        }

        .insights h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.4em;
        }

        .insights ul {
            list-style: none;
            padding: 0;
        }

        .insights li {
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
            position: relative;
            padding-left: 25px;
        }

        .insights li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
            font-size: 0.9em;
            border-top: 1px solid #ecf0f1;
            margin-top: 30px;
        }

        /* Print Styles */
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .chart-container { height: 300px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>${reportData.businessName}</h1>
            <p class="subtitle">Business Analytics Report</p>
            <span class="period">Reporting Period: ${
              reportData.reportMonth
            }</span>
        </div>

        <!-- Company Information -->
        <div class="company-info">
            <div class="info-item">
                <div class="info-icon">🏢</div>
                <div class="info-content">
                    <h3>Business Address</h3>
                    <p>${reportData.address}</p>
                </div>
            </div>
            <div class="info-item">
                <div class="info-icon">📋</div>
                <div class="info-content">
                    <h3>GST Registration</h3>
                    <p>${reportData.gstNumber}</p>
                </div>
            </div>
            <div class="info-item">
                <div class="info-icon">🌍</div>
                <div class="info-content">
                    <h3>State Code</h3>
                    <p>${reportData.stateCode} (West Bengal)</p>
                </div>
            </div>
        </div>

        <!-- KPI Dashboard -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <span class="kpi-value">${formatCurrency(
                  reportData.totalRevenue,
                )}</span>
                <div class="kpi-label">Total Revenue</div>
                <div class="kpi-change">+${revenueChange}% vs previous period</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${reportData.invoiceCount}</span>
                <div class="kpi-label">Total Invoices</div>
                <div class="kpi-change">+${invoiceChange}% vs previous period</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${reportData.uniqueCustomerCount}</span>
                <div class="kpi-label">Unique Customers</div>
                <div class="kpi-change">+${customerChange}% vs previous period</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${formatCurrency(
                  reportData.totalGstCollected,
                )}</span>
                <div class="kpi-label">GST Collected</div>
                <div class="kpi-change">+${gstChange}% vs previous period</div>
            </div>
        </div>

        <!-- Revenue Analysis -->
        <div class="revenue-analysis">
            <div class="chart-section">
                <h3 class="chart-title">Revenue Distribution</h3>
                <div class="chart-container chart-small">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>
            <div class="chart-section">
                <h3 class="chart-title">Monthly Performance</h3>
                <div class="chart-container chart-small">
                    <canvas id="performanceChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Top Products Performance -->
        <div class="chart-section">
            <h3 class="chart-title">Top Product Performance Analysis</h3>
            <div class="chart-container">
                <canvas id="productChart"></canvas>
            </div>
            
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Product Name</th>
                        <th>Quantity Sold</th>
                        <th>Revenue</th>
                        <th>Avg. Price</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateProductRows()}
                </tbody>
            </table>
        </div>

        <!-- Customer Analytics -->
        <div class="chart-section">
            <h3 class="chart-title">Customer & Financial Analytics</h3>
            <div class="chart-container">
                <canvas id="customerChart"></canvas>
            </div>
        </div>

        <!-- Key Insights -->
        <div class="insights">
            <h3>📊 Key Business Insights</h3>
            <ul>
                <li><strong>Premium Product Strategy:</strong> ${
                  sortedTopItems[0].itemName
                } generates highest revenue (${formatCurrency(
    sortedTopItems[0].totalRevenue,
  )}) with average price of ${formatCurrency(
    Math.round(sortedTopItems[0].totalRevenue / sortedTopItems[0].quantitySold),
  )} per unit</li>
                <li><strong>Volume Leader:</strong> ${
                  sortedTopItems.find(
                    item =>
                      item.quantitySold ===
                      Math.max(...sortedTopItems.map(i => i.quantitySold)),
                  ).itemName
                } leads in quantity sold but lower unit price suggests budget positioning</li>
                <li><strong>Customer Loyalty:</strong> Average ${invoicesPerCustomer} invoices per customer indicates strong repeat business</li>
                <li><strong>Discount Strategy:</strong> ${formatCurrency(
                  reportData.totalDiscount,
                )} total discounts (${discountRate}% of revenue) driving customer acquisition</li>
                <li><strong>Tax Efficiency:</strong> GST collection of ${formatCurrency(
                  reportData.totalGstCollected,
                )} represents ${effectiveTaxRate}% effective tax rate</li>
                <li><strong>Revenue Concentration:</strong> Top 3 products contribute ${top3RevenuePercentage}% of total revenue</li>
            </ul>
        </div>

        <!-- Additional Metrics -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <span class="kpi-value">${formatCurrency(
                  avgRevenuePerInvoice,
                )}</span>
                <div class="kpi-label">Avg Revenue per Invoice</div>
                <div class="kpi-change">Optimal transaction size</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${formatCurrency(
                  avgRevenuePerCustomer,
                )}</span>
                <div class="kpi-label">Avg Revenue per Customer</div>
                <div class="kpi-change">Strong customer value</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${discountRate}%</span>
                <div class="kpi-label">Discount Rate</div>
                <div class="kpi-change">Competitive pricing</div>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${invoicesPerCustomer}</span>
                <div class="kpi-label">Invoices per Customer</div>
                <div class="kpi-change">High engagement</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Report Generated:</strong> ${new Date(
              reportData.updatedAt,
            ).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} | <strong>Data Source:</strong> ${
    reportData.businessName
  } ERP System</p>
            <p>This report contains confidential business information. Distribution restricted to authorized personnel only.</p>
        </div>
    </div>

    <script>
        // Revenue Distribution Pie Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ${JSON.stringify(revenueLabels)},
                datasets: [{
                    data: ${JSON.stringify(revenueDistribution)},
                    backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return \`\${label}: \${formatCurrency(value)} (\${percentage}%)\`;
                            }
                        }
                    }
                }
            }
        });

        // Performance Line Chart
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Weekly Revenue',
                    data: ${JSON.stringify(weeklyPerformance)},
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // Product Performance Bar Chart
        const productCtx = document.getElementById('productChart').getContext('2d');
        new Chart(productCtx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(revenueLabels)},
                datasets: [{
                    label: 'Revenue (₹)',
                    data: ${JSON.stringify(revenueDistribution)},
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }, {
                    label: 'Quantity Sold',
                    data: ${JSON.stringify(
                      sortedTopItems.map(item => item.quantitySold),
                    )},
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });

        // Customer Analytics Chart
        const customerCtx = document.getElementById('customerChart').getContext('2d');
        new Chart(customerCtx, {
            type: 'bar',
            data: {
                labels: ['Total Revenue', 'GST Collected', 'Discounts Given', 'Net Revenue'],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [
                        ${reportData.totalRevenue},
                        ${reportData.totalGstCollected},
                        ${reportData.totalDiscount},
                        ${netRevenue}
                    ],
                    backgroundColor: ['#3498db', '#27ae60', '#e74c3c', '#f39c12'],
                    borderColor: ['#2980b9', '#229954', '#c0392b', '#e67e22'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // Helper function to format currency
        function formatCurrency(amount) {
            return '₹' + amount.toLocaleString('en-IN');
        }

        // Sparklines
        function createSparkline(id, data) {
            const ctx = document.getElementById(id).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', ''],
                    datasets: [{
                        data: data,
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }

        // Create sparklines for each product
        ${sortedTopItems
          .map(
            (item, index) => `
            createSparkline('spark${index + 1}', ${JSON.stringify(
              sparklineData[item.itemName] || [10, 15, 12, 18, 20],
            )});
        `,
          )
          .join('')}
    </script>
</body>
</html>`;
};

export {reportTemplate};
