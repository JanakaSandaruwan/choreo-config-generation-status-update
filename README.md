# choreo-config-generation-status-update

This action will update the Config Mapping which stored the config.schema generation progress.

## Example

```yaml
steps:
  - name: Update Config Generation Status
    uses: choreo-templates/choreo-config-generation-status-update@v1.0.0
    with:
      baseURL: ${{ BASE_URL }}
      componentId: ${{ COMPONENT_ID }}
      versionId: ${{ VERSION_ID }}
      configMappingId: ${{ CONFIG_MAPPING_ID }}
      sourceCommit: ${{ SOURCE_COMMIT }}
      gitOpsCommit: ${{ GIT_OPS_COMMIT }}
      status: ${{ STATUS }}
```

Please note that the status can only be `In Progress`, `Completed` or `Failed`
