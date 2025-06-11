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











  doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  const text = "Income Tax Summary";
  const textWidth = doc.getTextWidth(text);
  let textX = (pageWidth - textWidth) / 2 ;
  
  let horizontalY = 30;
  doc.text(text.toString(), textX, horizontalY);


  textX = 30;
  const name = document.getElementById('name').value;
  const taxyear = document.getElementById('tax-year').value;

  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('tax-year', document.getElementById('tax-year').value); 

  console.log("Name", name);
  console.log("tax-year", taxyear);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12); 
  // horizontalY+=10;
  // doc.text(taxyear.toString(), textX, horizontalY+=10);
  // doc.text(name.toString(), textX, horizontalY+=6);

  doc.setFont("helvetica", "bold");
  doc.text(`Tax-Year:`, textX, horizontalY+=15); doc.setFont("helvetica", "normal");
  doc.text(`${taxyear}`, textX+40, horizontalY);
  
  doc.setFont("helvetica", "bold");
  doc.text(`Name:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${name}`, textX+40, horizontalY);

  // doc.text(`Total Income: ${total_income}`, textX, horizontalY+=10);  
  // doc.text(`Taxable Income: ${taxable_income}`, textX, horizontalY+=6);

  doc.setFont("helvetica", "bold");
  doc.text(`Total Income:`, textX, horizontalY+=10); doc.setFont("helvetica", "normal");
  doc.text(`${total_income.toFixed(2)} Taka`, textX+40, horizontalY); 
  
  doc.setFont("helvetica", "bold");
  doc.text(`Taxable Income:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${taxable_income.toFixed(2)} Taka`, textX+40, horizontalY);



  const headers = ["Slab", "Amount", "Rate", "Tax"];
 
  let startY = horizontalY;
  doc.setFontSize(12);
  doc.setTextColor(0);
  const cellPadding = 3;
  const colWidths = [25, 35, 25, 20];

  // Headers

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Tax BreakDown:`, textX, startY+=10);
  startY+=6;


  doc.setFont("helvetica", "bold");
  const columns = [
    { header: 'Slab', dataKey: 'slab' },
    { header: 'Amount', dataKey: 'printDescription' },
    { header: 'Rate', dataKey: 'rate' },
    { header: 'Tax', dataKey: 'tax' },
  ];

  doc.autoTable({
    columns: columns,
    body: data,
    startY: startY,
    styles: {
      fontSize: 10,
      textColor: [40, 40, 40],
      fillColor: [240, 240, 240],
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fillColor: [51, 69, 83],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    margin: { top: 10, left: textX+10, right: 24},
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Summary
  const summaryY = startY + 7 + data.length * 7 + 10;
  doc.setFontSize(12);
  horizontalY = summaryY;

  doc.setFont("helvetica", "bold");
  doc.text(`Payable Tax:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${total_tax.toFixed(2)} Taka`, textX+40, horizontalY);

  doc.setFont("helvetica", "bold");
  doc.text(`Total Investment:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${dps_amount.toFixed(2)} Taka`, textX+40, horizontalY);

  doc.setFont("helvetica", "bold");
  doc.text(`Max Rebate:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${max_rebate.toFixed(2)} Taka`, textX+40, horizontalY);

  doc.setFont("helvetica", "bold");
  doc.text(`Remaining Tax:`, textX, horizontalY+=6); doc.setFont("helvetica", "normal");
  doc.text(`${remaining_tax.toFixed(2)} Taka`, textX+40, horizontalY);

  setTimeout(() => {
    document.getElementById('slab_div').style.display = 'inline-block';
  }, 1000);

});


document.getElementById('downloadBtn').addEventListener('click', function () {
    // Draw top margin
    doc.line(20, 10, 190, 10); 

    // Draw bottom margin
    doc.line(20, 280, 190, 280);

    // Draw left margin
    doc.line(20, 10, 20, 280);

    // Draw right margin
    doc.line(190, 10, 190, 280);


  let name = localStorage.getItem('name').toLowerCase();
  name = name.replace(/(?!^)\s(?!$)/g, '');
  const taxyear = localStorage.getItem('tax-year');

  doc.save(`${name}-tax-summary-${taxyear}.pdf`);
  
});