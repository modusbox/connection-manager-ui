/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

const isString = item => typeof item === 'string';

const composeClassName = (items = []) => {
  if (!Array.isArray(items)) {
    throw new Error('Class name should be wrapped into an array');
  }
  return items.filter(isString).join(' ');
};

const composeOption = (label, value) => ({ label, value });

const composeOptions = sourceMaps => {
  return Object.entries(sourceMaps).map(sourceMap => {
    const [label, value] = sourceMap;
    return composeOption(label, value);
  });
};

const downloadFile = (content, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const readFileAsText = file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
};

const loadFile = async (accept = undefined) => {
  return new Promise((resolve, reject) => {
    const fileSelector = document.createElement('input');
    const handleFileChange = async evt => {
      const [file] = evt.target.files;
      let content = null;
      try {
        content = await readFileAsText(file);
        resolve(content);
      } catch (err) {
        reject(err);
      }
      fileSelector.removeEventListener('change', handleFileChange, false);
      document.body.removeChild(fileSelector);
    };
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', accept);
    document.body.appendChild(fileSelector);
    fileSelector.addEventListener('change', handleFileChange, false);
    fileSelector.click();
  });
};

export { composeClassName, composeOptions, downloadFile, loadFile };
