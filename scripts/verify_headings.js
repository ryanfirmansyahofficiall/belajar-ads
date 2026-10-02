async function verify() {
  console.log('--- Testing /programs ---');
  const res1 = await fetch('http://localhost:3000/programs');
  const html1 = await res1.text();
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g;
  let match;
  while ((match = h3Regex.exec(html1)) !== null) {
    console.log('PROGRAM H3:', match[1]);
  }

  console.log('\n--- Testing Homepage / ---');
  const res2 = await fetch('http://localhost:3000/');
  const html2 = await res2.text();
  while ((match = h3Regex.exec(html2)) !== null) {
    console.log('HOMEPAGE H3:', match[1]);
  }
}

verify().catch(console.error);
