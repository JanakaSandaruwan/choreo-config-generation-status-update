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
    const token = core.getInput('token');

    const url = `${baseURL}/orgs/choreo/projects/project/components/${componentId}/versions/${versionId}/commits/${sourceCommit}/configurable-commit-mapping`;
    const payload = {
        status: status,
        workflow: workflow,
        id: configMappingId,
        gitOpsCommit: gitOpsCommit,
        token: token
    }
    console.log("Payload : ", payload);
    axios.put(url, payload).then(
        () => {
            console.log("choreo-update-config-generation-status", "saved");
        }
    ).catch((error => {
        console.error('Error', error);
        if (error.response) {
            console.log("choreo-status", error.response.data);
            console.log(error.response.status);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
            console.log("choreo-status", "failed");
        }
    }))
} catch (e) {
    console.log("choreo-update-config-generation-status-save", "failed");
    console.log("choreo-update-config-generation-status-save", e.message);
}
