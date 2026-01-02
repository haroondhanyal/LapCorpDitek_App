import { allure } from 'allure-playwright';
import fs from 'fs';
import path from 'path';

export async function addAllureHeader() {
  const logoPath = path.join(process.cwd(), 'assets', 'softbuildlogo.png');
  const logo = await fs.promises.readFile(logoPath);
  const logoBase64 = logo.toString('base64');

  await allure.descriptionHtml(`
    <div style="text-align:center">
      <img src="data:image/png;base64,${logoBase64}" width="180"/>
      <h3>SoftBuild Pvt Ltd</h3>
      <h4>LabCorp Ditek Automation</h4>
      <h4>Module: Direct To Patient</h4>
      <h4>Environment: QA</h4>
      <h4>Tester: Haroon Raja</h4>
      <hr/>
    </div>
  `);
}

export async function attachScreenshot(page, name = 'Screenshot') {
  const buffer = await page.screenshot();
  await allure.attachment(name, buffer, 'image/png');
}

export async function attachVideo(testInfo) {
  if (!testInfo.video) return;

  const videoPath = testInfo.video[0].path;
  const videoBuffer = await fs.promises.readFile(videoPath);
  const videoBase64 = videoBuffer.toString('base64');

  await allure.descriptionHtml(`
    <h3>Execution Video</h3>
    <video width="600" controls>
      <source src="data:video/webm;base64,${videoBase64}" type="video/webm">
    </video>
    <hr/>
  `);
}
