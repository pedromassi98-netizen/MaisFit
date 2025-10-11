  const downloadPDF = () => {
    if (!nutritionPlan) return;

    const doc = new jsPDF();
    let yPosition = 20;

    // Título
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PLANO NUTRICIONAL PERSONALIZADO - MAIS FIT', 20, yPosition);
    yPosition += 20;

    // Dados pessoais
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS PESSOAIS:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nome: ${userData.name}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Objetivo: ${userData.goal}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Calorias diárias: ${nutritionPlan.calories} kcal`, 20, yPosition);
    yPosition += 8;
    doc.text(`Proteínas: ${nutritionPlan.protein}g`, 20, yPosition);
    yPosition += 8;
    doc.text(`Carboidratos: ${nutritionPlan.carbs}g`, 20, yPosition);
    yPosition += 8;
    doc.text(`Gorduras: ${nutritionPlan.fat}g`, 20, yPosition);
    yPosition += 20;

    // Refeições
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('REFEIÇÕES:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    nutritionPlan.meals.forEach(meal => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`${meal.name} - ${meal.time}`, 20, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      meal.foods.forEach(food => {
        doc.text(`• ${food.amount} de ${food.name} (${food.calories} kcal)`, 25, yPosition);
        yPosition += 6;
      });

      doc.text(`Total: ${meal.calories} kcal`, 25, yPosition);
      yPosition += 10;
    });

    // Suplementação
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SUPLEMENTAÇÃO:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    nutritionPlan.supplements.forEach(supp => {
      doc.text(`• ${supp.name} - ${supp.dosage} - ${supp.timing}`, 20, yPosition);
      yPosition += 8;
    });

    yPosition += 10;

    // Dicas
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DICAS IMPORTANTES:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    nutritionPlan.tips.forEach(tip => {
      doc.text(`• ${tip}`, 20, yPosition);
      yPosition += 8;
    });

    // Data
    yPosition += 10;
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);

    // Baixar
    doc.save(`dieta-personalizada-${userData.name?.replace(/\\s+/g, '-').toLowerCase() || 'usuario'}.pdf`);
  };