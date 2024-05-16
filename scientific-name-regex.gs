function checkTypos() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();

  // List of expected scientific names with correct capitalizations
  let expectedNames = ['luteofolius', 'luteus', 'subspectabilis', 'insignis', 'pulchrifolius', 'bisporus', 'cinctulus', 'fimicola', 'olivaceus', 'cyanopus', 'smithii', 'Pluteus', 'americanus', 'albostipitatus', 'meridionalis', 'saupei', 'caerulipes', 'caeruleorhiza', 'cubensis', 'cyanescens', 'liniformans', 'ovoideocystidiata', 'ovoid', 'Gymnopilus', 'Inocybe', 'Psilocybe', 'psilocybin', 'silvatica', 'Psilocybe', 'Psilocybin', 'Gymnopilus', 'Inocybe', 'luteofolius', 'Pholiotina', 'americana', 'junonius', 'Cervinus'];

  // Regex parts to allow detecting close matches (typos)
  const typoPatterns = expectedNames.map(name => {
    return name.split(' ').map(word => {
      // Allow up to one unexpected character or a missing character in each word
      return word.split('').map(char => `[${char.toLowerCase()}${char.toUpperCase()}]{0,1}${char}[${char.toLowerCase()}${char.toUpperCase()}]{0,1}`).join('');
    }).join('\\s+');
  });

  const pattern = '\\b(' + typoPatterns.join('|') + ')\\b';
  const regex = new RegExp(pattern, 'gi');

  let typos = [];
  let result;
  while ((result = regex.exec(text)) !== null) {
    // Normalize result for comparison by converting to lowercase
    let normalizedResult = result[0].toLowerCase();
    // Check against normalized expected names
    if (!expectedNames.map(name => name.toLowerCase()).includes(normalizedResult)) {
      typos.push(result[0]);
    }
  }

  // Output the results
  if (typos.length > 0) {
    Logger.log('Potential typos found: ' + typos.join(', '));
  } else {
    Logger.log('No typos found.');
  }
}
