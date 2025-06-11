
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
// document.getElementById('investment_amount').value = localStorage.getItem('investment_amount');




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
  // const investment_amount = parseFloat(document.getElementById('investment_amount').value);


  localStorage.setItem('dps_amount', dps_amount);
  // localStorage.setItem('investment_amount', investment_amount);


  document.getElementById('total_investment').textContent = `Total Investment: ৳${dps_amount.toFixed(2)}`;

  localStorage.setItem('total_investment', total_investment);


  let tax = 0;


  const taxSlabs = [
    {
      slab: "1st slab",
      description: "350000",
      amount: 350000,
      rate: 0
    },
    {
      slab: "2nd slab",
      description: "100000",
      amount: 100000,
      rate: 0.05
    },
    {
      slab: "3rd slab",
      description: "300000",
      amount: 300000,
      rate: 0.10
    },
    {
      slab: "4th slab",
      description: "400000",
      amount: 400000,
      rate: 0.15
    },
    {
      slab: "5th slab",
      description: "500000",
      amount: 500000,
      rate: 0.20
    },
    {
      slab: "6th slab",
      description: ">500000",
      amount: 6000000000,
      rate: 0.25
    }
  ];

  let taxable_income = total_income == 0 ? 0 : total_income - Math.min(450000, total_income / 3);
  document.getElementById('taxable_income').textContent = `Taxable Income: ৳${taxable_income.toFixed(2)}`;

  // const tbody = document.getElementById('taxTableBody');
  let remainingIncome = taxable_income;

  let total_tax = 0;

  const data = []

  taxSlabs.forEach(slab => {
    const taxableAmount = Math.min(remainingIncome, slab.amount);
    const tax = taxableAmount * slab.rate;
    remainingIncome -= taxableAmount;

    data.push([
      slab.slab,
      slab.amount.toString(),
      `${slab.rate * 100}%`,
      tax.toFixed(0)  // rounded to integer
    ]);

    const row = `
        <tr>
          <td>${slab.slab}</td>
          <td>${slab.description}</td>
          <td>${(slab.rate * 100).toFixed(0)}%</td>
          <td>${taxableAmount}</td>
          <td>${tax.toFixed(0)}</td>
        </tr>
      `;

      // const row = `
      //   <tr>
      //     <td>${slab.slab}</td>
      //     <td>${slab.description}</td>
      //     <td>${slab.amount}</td>
      //     <td>${(slab.rate * 100).toFixed(0)}%</td>
      //     <td>${Math.max(0, remainingIncome)}</td>
      //     <td>${taxableAmount}</td>
      //     <td>${tax.toFixed(0)}</td>
      //   </tr>
      // `;

    total_tax += tax;

    tbody.insertAdjacentHTML('beforeend', row);

    
  });


  const max_allowable_dps = Math.min(dps_amount, 120000);
  const allowable_rebate = 0.03 * taxable_income;

  const max_rebate = Math.min(max_allowable_dps * 0.15, allowable_rebate);

  const remaining_tax = Math.max(0.0, total_tax - max_rebate);




  document.getElementById('total_tax').textContent = `Total Tax: ৳${total_tax.toFixed(2)}`;
  document.getElementById('total_rebate').textContent = `Total Rebate: ৳${max_rebate.toFixed(2)}`;
  document.getElementById('remaining_tax').textContent = `Remaining Tax: ৳${remaining_tax.toFixed(2)}`;











  doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);

  const text = "Tax Summary Report";
  const textWidth = doc.getTextWidth(text);
  const textX = (pageWidth - textWidth) / 2;
  let horizontalY = 20;
  doc.setFontSize(20);
  doc.text(text.toString(), textX, horizontalY);

  const name = "Name: "+document.getElementById('name').value;
  const taxyear = "Tax Year: "+ document.getElementById('tax-year').value;

  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('tax-year', document.getElementById('tax-year').value); 

  console.log("Name", name);
  console.log("tax-year", taxyear);

  doc.setFontSize(12); 
  doc.text(taxyear.toString(), 14, horizontalY+=10);
  doc.text(name.toString(), 14, horizontalY+=6);

  doc.text(`Total Income: ${total_income}`, 14, horizontalY+=10);
  
  // Subheading
  // doc.setFontSize(14);
  
  doc.text(`Taxable Income: ${taxable_income}`, 14, horizontalY+=6);

  const headers = ["Slab", "Amount", "Rate", "Tax"];
  // const data = [
  //   ["1st Slab", "first 350000", "350000", "0%", "415000", "350000", "0"],
  //   ["2nd Slab", "next 100000", "100000", "5%", "315000", "100000", "5000"],
  //   ["3rd Slab", "next 300000", "300000", "10%", "15000", "15000", "1500"],
  //   ["4th Slab", "next 400000", "400000", "15%", "0", "0", "0"],
  //   ["5th Slab", "next 500000", "500000", "20%", "0", "0", "0"],
  //   ["6th Slab", "next 600000", "600000", "25%", "0", "0", "0"]
  // ];





  // Draw table manually
  let startY = horizontalY+=10;
  doc.setFontSize(12);
  doc.setTextColor(0);
  const cellPadding = 3;
  const colWidths = [25, 35, 25, 20, 30, 30, 20];

  // Draw headers
  doc.setFont("helvetica", "bold");
  let x = 14;
  headers.forEach((h, i) => {
    doc.text(h, x + cellPadding, startY);
    x += colWidths[i];
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);



  // Draw data rows
  data.forEach((row, rowIndex) => {
    let y = startY + 7 + rowIndex * 7;
    let x = 14;
    row.forEach((cell, colIndex) => {
      doc.text(cell.toString(), x + cellPadding, y);
      x += colWidths[colIndex];
    });
  });

  // Summary
  const summaryY = startY + 7 + data.length * 7 + 5;
  doc.setFontSize(12);
 // let st = "Hello";
 // doc.text(st.toString(), 14, summaryY);
  horizontalY = summaryY;
  doc.text(`Payable Tax: ${total_tax}`, 14, horizontalY+=6);
  doc.text(`Total Investment: ${dps_amount}`, 14, horizontalY+=6);
  doc.text(`Rebate: ${max_rebate}`, 14, horizontalY+=6);
  doc.text(`Remaining Tax: ${remaining_tax}`, 14, horizontalY+=6);

  // Save the PDF



  setTimeout(() => {
   // doc.save("tax-summary.pdf");
    document.getElementById('slab_div').style.display = 'inline-block';
  }, 1000);



});


document.getElementById('downloadBtn').addEventListener('click', function () {

  doc.save("tax-summary.pdf");
  // async function generatePDF() {


  //   // Title


  //   // Table headers


  //   // Draw table manually
  //   let startY = 40;
  //   doc.setFontSize(10);
  //   doc.setTextColor(0);
  //   const cellPadding = 3;
  //   const colWidths = [25, 35, 25, 20, 30, 30, 20];

  //   // Draw headers
  //   let x = 14;
  //   headers.forEach((h, i) => {
  //     doc.text(h, x + cellPadding, startY);
  //     x += colWidths[i];
  //   });

  //   // Draw data rows
  //   data.forEach((row, rowIndex) => {
  //     let y = startY + 7 + rowIndex * 7;
  //     let x = 14;
  //     row.forEach((cell, colIndex) => {
  //       doc.text(cell.toString(), x + cellPadding, y);
  //       x += colWidths[colIndex];
  //     });
  //   });

  //   // Summary
  //   const summaryY = startY + 7 + data.length * 7 + 10;
  //   doc.setFontSize(12);
  //   doc.text(`Total Tax: ₹6500`, 14, summaryY);
  //   doc.text(`Rebate: ₹2000`, 14, summaryY + 8);
  //   doc.text(`Remaining Tax: ₹4500`, 14, summaryY + 16);

  //   // Save the PDF
  //   doc.save("tax-summary.pdf");
  // }

  // generatePDF();
});