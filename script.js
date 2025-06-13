document.getElementById('income_1').value = localStorage.getItem('income1');
document.getElementById('income_2').value = localStorage.getItem('income2');

document.getElementById('name').value = localStorage.getItem('name');
document.getElementById('tax-year').value = localStorage.getItem('tax-year');

document.getElementById('income_month_1').value = localStorage.getItem('income_month_1');
document.getElementById('income_month_2').value = localStorage.getItem('income_month_2');

document.getElementById('bonus_1').value = localStorage.getItem('bonus1');
document.getElementById('bonus_2').value = localStorage.getItem('bonus2');

document.getElementById('bonus_month_1').value = localStorage.getItem('bonus_month_1');
document.getElementById('bonus_month_2').value = localStorage.getItem('bonus_month_2');

document.getElementById('dps_amount').value = localStorage.getItem('dps_amount');

const { jsPDF } = window.jspdf;
let doc = new jsPDF();


document.getElementById('taxForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const tbody = document.getElementById('taxTableBody');
  tbody.innerHTML = '';

  const income1 = parseFloat(document.getElementById('income_1').value) || 0;
  const income2 = parseFloat(document.getElementById('income_2').value) || 0;
  localStorage.setItem('income1', income1);
  localStorage.setItem('income2', income2);

  const income_month_1 = parseFloat(document.getElementById('income_month_1').value) || 0;
  const income_month_2 = parseFloat(document.getElementById('income_month_2').value) || 0;

  localStorage.setItem('income_month_1', income_month_1);
  localStorage.setItem('income_month_2', income_month_2);

  const bonus1 = parseFloat(document.getElementById('bonus_1').value);
  const bonus2 = parseFloat(document.getElementById('bonus_2').value);
  localStorage.setItem('bonus1', bonus1);
  localStorage.setItem('bonus2', bonus2);

  const bonus_month_1 = parseFloat(document.getElementById('bonus_month_1').value) || 0;
  const bonus_month_2 = parseFloat(document.getElementById('bonus_month_2').value) || 0;
  localStorage.setItem('bonus_month_1', bonus_month_1);
  localStorage.setItem('bonus_month_2', bonus_month_2);

  const total_income = (income1 * income_month_1) + (income2 * income_month_2) + (bonus1 * bonus_month_1) + (bonus2 * bonus_month_2);

  document.getElementById('total_salary').textContent = `Total Salary: ৳${total_income.toFixed(2)}`;
  localStorage.setItem('total_salary', total_income);

  const dps_amount = parseFloat(document.getElementById('dps_amount').value) || 0;
  localStorage.setItem('dps_amount', dps_amount);

  document.getElementById('total_investment').textContent = `Total Investment: ৳${dps_amount.toFixed(2)}`;

  localStorage.setItem('total_investment', total_investment);


  let tax = 0;


  const taxSlabs = [
    {
      slab: "1st slab",
      description: "350000",
      printDescription: "350000",
      amount: 350000,
      rate: 0
    },
    {
      slab: "2nd slab",
      description: "100000",
      printDescription: "100000",
      amount: 100000,
      rate: 0.05
    },
    {
      slab: "3rd slab",
      description: "300000",
      printDescription: "300000",
      amount: 300000,
      rate: 0.10
    },
    {
      slab: "4th slab",
      description: "400000",
      printDescription: "400000",
      amount: 400000,
      rate: 0.15
    },
    {
      slab: "5th slab",
      description: "500000",
      printDescription: "500000",
      amount: 500000,
      rate: 0.20
    },
    {
      slab: "6th slab",
      description: "6000000000",
      printDescription: ">500000",
      amount: 6000000000,
      rate: 0.25
    }
  ];

  let taxable_income = total_income == 0 ? 0 : total_income - Math.min(450000, total_income / 3);
  document.getElementById('taxable_income').textContent = `Taxable Income: ৳${taxable_income.toFixed(2)}`;

  let remainingIncome = taxable_income;
  let total_tax = 0;
  const data = []

  taxSlabs.forEach(slab => {
    const taxableAmount = Math.min(remainingIncome, slab.amount);
    const tax = taxableAmount * slab.rate;
    remainingIncome -= taxableAmount;
    console.log("Tax: ", tax, taxableAmount);

    data.push([
      slab.slab,
      slab.printDescription,
      `${slab.rate * 100}%`,
      tax.toFixed(2)
    ]);

    const row = `
        <tr>
          <td>${slab.slab}</td>
          <td>${slab.printDescription}</td>
          <td>${(slab.rate * 100).toFixed(0)}%</td>
          <td>${taxableAmount.toFixed(2)}</td>
          <td>${tax.toFixed(0)}</td>
        </tr>
      `;

    total_tax += tax;

    tbody.insertAdjacentHTML('beforeend', row);
  });


  const max_allowable_dps = Math.min(dps_amount, 120000);
  const allowable_rebate = 0.03 * taxable_income;

  const max_rebate = Math.min(max_allowable_dps * 0.15, allowable_rebate);

  const remaining_tax = Math.max(0.0, total_tax - max_rebate);




  document.getElementById('total_tax').textContent = `Total Tax: ৳${total_tax.toFixed(2)}`;
  document.getElementById('total_rebate').textContent = `Max Rebate: ৳${max_rebate.toFixed(2)}`;
  document.getElementById('remaining_tax').textContent = `Remaining Tax: ৳${remaining_tax.toFixed(2)}`;










  // Create new PDF document
     doc = new jsPDF();
 const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Color scheme
    const primaryColor = [98, 55, 173]; //rgb(98, 55, 173)
    const secondaryColor = [98, 55, 173]; // #764ba2
    const darkGray = [45, 55, 72];
    const lightGray = [247, 250, 252];
    const white = [255, 255, 255];
    
    // Get form data
    const name = document.getElementById('name').value || 'N/A';
    const taxYear = document.getElementById('tax-year').value;
    
    // ===== PAGE 1 LAYOUT =====
    
    // Compact header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Add gradient effect simulation
    doc.setFillColor(98, 55, 173);
    doc.rect(0, 0, pageWidth, 15, 'F');
    doc.setFillColor(98, 55, 173);  
    doc.rect(0, 15, pageWidth, 20, 'F');
    
    // Header title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    const headerText = "INCOME TAX SUMMARY";
    const headerTextWidth = doc.getTextWidth(headerText);
    doc.text(headerText, (pageWidth - headerTextWidth) / 2, 23);
    
    // Reset text color for body
    doc.setTextColor(...darkGray);
    
    // Personal Information Section - Compact
    let currentY = 50;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("Personal Information", 20, currentY);
    
    // Add section underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.8);
    doc.line(20, currentY + 2, 110, currentY + 2);
    
    currentY += 8;
    
    // Compact info layout - side by side
    doc.setFillColor(...lightGray);
    doc.roundedRect(15, currentY, pageWidth - 30, 18, 2, 2, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...darkGray);
    
    doc.text("Tax Year:", 20, currentY + 7);
    doc.setFont("helvetica", "normal");
    doc.text(taxYear, 50, currentY + 7);
    
    doc.setFont("helvetica", "bold");
    doc.text("Name:", 20, currentY + 14);
    doc.setFont("helvetica", "normal");
    doc.text(name, 50, currentY + 14);
    
    currentY += 25;
    
    // Financial Summary Section - Compact
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("Financial Summary", 20, currentY);
    
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.8);
    doc.line(20, currentY + 2, 105, currentY + 2);
    
    currentY += 8;
    
    // Format currency function
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount) + ' Taka';
    };
    
    // Compact financial summary
    doc.setFillColor(...lightGray);
    doc.roundedRect(15, currentY, pageWidth - 30, 24, 2, 2, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...darkGray);
    
    const leftCol = 20;
    const rightCol = 110;
    
    doc.text("Total Salary:", leftCol, currentY + 7);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(total_income), rightCol, currentY + 7);
    
    doc.setFont("helvetica", "bold");
    doc.text("Total Investment:", leftCol, currentY + 14);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(dps_amount), rightCol, currentY + 14);
    
    doc.setFont("helvetica", "bold");
    doc.text("Taxable Income:", leftCol, currentY + 21);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(formatCurrency(taxable_income), rightCol, currentY + 21);
    
    currentY += 35;
    
    // Tax Breakdown Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("Tax Breakdown", 20, currentY);
    
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.8);
    doc.line(20, currentY + 2, 95, currentY + 2);
    
    currentY += 8;
    
    // Compact table configuration
    const columns = [
        { header: 'Slab', dataKey: 'slab' },
        { header: 'Amount', dataKey: 'printDescription' },
        { header: 'Rate', dataKey: 'rate' },
        { header: 'Tax', dataKey: 'tax' }
    ];
    
    // Format table data for better display
    const formattedData = data.map(row => ({
        ...row,
        printDescription: formatCurrency(parseFloat(row[1].replace(/[৳,]/g, ''))),
        tax: formatCurrency(parseFloat(row[3].replace(/[৳,]/g, '')))
    }));
    
    doc.autoTable({
        columns: columns,
        body: data,
        startY: currentY,
        theme: 'striped',
        styles: {
            fontSize: 9,
            textColor: darkGray,
            cellPadding: 3,
            valign: 'middle'
        },
        headStyles: {
            fillColor: primaryColor,
            textColor: white,
            fontStyle: 'bold',
            fontSize: 10
        },
        alternateRowStyles: {
            fillColor: [252, 252, 254]
        },
        columnStyles: {
            0: { halign: 'left', cellWidth: 35 },
            1: { halign: 'right', cellWidth: 50 },
            2: { halign: 'center', cellWidth: 25 },
            3: { halign: 'right', cellWidth: 35 }
        },
        margin: { left: 35, right: 15 },
        tableWidth: 'wrap'
    });
    
    // Get table end position
    const tableEndY = doc.lastAutoTable.finalY;
    
    // Check if we need a new page for summary
    const summaryHeight = 60;
    const footerHeight = 20;
    let summaryY;
    
    if (tableEndY + summaryHeight + footerHeight > pageHeight - 10) {
        // Add new page
        doc.addPage();
        summaryY = 30;
        
        // Add page header for page 2
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(...primaryColor);
        doc.text("Tax Summary - Continued", 20, 20);
        doc.setDrawColor(...primaryColor);
        doc.line(20, 22, 120, 22);
    } else {
        summaryY = tableEndY + 15;
    }
    
    // Tax Summary Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("Final Tax Summary", 20, summaryY);
    
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.8);
    doc.line(20, summaryY + 2, 115, summaryY + 2);
    
    summaryY += 10;
    
    // Enhanced summary box
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(35, summaryY, pageWidth - 50, 35, 3, 3, 'F');
    
    // Add subtle border
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(35, summaryY, pageWidth - 50, 35, 3, 3, 'S');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...darkGray);
    
    const summaryLeftCol = 40;
    const summaryRightCol = 130;
    
    doc.text("Total Payable Tax:", summaryLeftCol, summaryY + 10);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(total_tax), summaryRightCol, summaryY + 10);
    
    doc.setFont("helvetica", "bold");
    doc.text("Maximum Rebate:", summaryLeftCol, summaryY + 18);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(max_rebate), summaryRightCol, summaryY + 18);
    
    // Highlight net tax - larger and colored
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...secondaryColor);
    doc.text("Net Tax Payable:", summaryLeftCol, summaryY + 28);
    doc.setFontSize(14);
    doc.text(formatCurrency(remaining_tax), summaryRightCol, summaryY + 28);
    
    // Add footer on current page
    const currentPageHeight = doc.internal.pageSize.getHeight();
    const footerY = currentPageHeight - 15;
    
    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(35, footerY - 5, pageWidth - 15, footerY - 5);
    
    // Footer text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    
    const currentDate = new Date().toLocaleDateString('en-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const footerText = `Generated on ${currentDate} | Tax Calculator | Developed by Mustafiz Arman`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerWidth) / 2, footerY);
    
    // Add page numbers if multiple pages
    const pageCount = doc.getNumberOfPages();
    if (pageCount > 1) {
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(120, 120, 120);
            doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, footerY);
        }
    }
    
  setTimeout(() => {
    document.getElementById('slab_div').style.display = 'inline-block';
  }, 1000);

});


document.getElementById('downloadBtn').addEventListener('click', function () {
    // Draw top margin
    // doc.line(20, 10, 190, 10); 

    // // Draw bottom margin
    // doc.line(20, 280, 190, 280);

    // // Draw left margin
    // doc.line(20, 10, 20, 280);

    // // Draw right margin
    // doc.line(190, 10, 190, 280);


  let name = localStorage.getItem('name').toLowerCase();
  name = name.replace(/(?!^)\s(?!$)/g, '');
  const taxyear = localStorage.getItem('tax-year');

  doc.save(`${name}-tax-summary-${taxyear}.pdf`);
  
});