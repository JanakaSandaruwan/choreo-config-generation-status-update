const core = require('@actions/core');
const axios = require('axios').default;

try {
    const baseURL = core.getInput('baseURL');
    const componentId = core.getInput('componentId');
    const versionId = core.getInput('versionId');
    const sourceCommit = core.getInput('sourceCommit');
    const gitOpsCommit = core.getInput('gitOpsCommit');
    const status = core.getInput('status');
    const workflow = core.getInput('workflow');
    const configMappingId = core.getInput('configMappingId');

    const url = `${baseURL}/orgs/choreo/projects/project/components/${componentId}/versions/${versionId}/commits/${sourceCommit}/configurable-commit-mapping`;
    const payload = {
        status: status,
        workflow: workflow,
        id: configMappingId,
        gitOpsCommit: gitOpsCommit
    }
    console.log("Payload : ", payload);
    axios.put(url, payload).then(
        () => {
            core.setOutput("choreo-update-config-generation-status", "saved");
            console.log("choreo-update-config-generation-status", "saved");
        }
    ).catch((error => {
        console.error('Error', error);
        if (error.response) {
            core.setOutput("choreo-status", error.response.data);
            console.log(error.response.status);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
            core.setOutput("choreo-status", "failed");
        }
    }))
} catch (e) {
    core.setOutput("choreo-update-config-generation-status-save", "failed");
    console.log("choreo-update-config-generation-status-save", "failed");
    console.log("choreo-update-config-generation-status-save", e.message);
}
