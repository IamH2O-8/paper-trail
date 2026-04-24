const { readJsonBody } = require("../../server/readJsonBody");
const { badRequest, notFound, sendJson } = require("../../server/responses");
const { listRecords, getRecordById, createRecord, updateRecord, archiveRecord, deleteRecord } = require("../../services/recordService");
const { resourceDefinitions } = require("../../domain/resourceDefinitions");

function buildResourceRoutes(resourceName) {
  const singular = resourceDefinitions[resourceName]?.singular || "record";

  return [
    {
      method: "GET",
      path: `/api/${resourceName}`,
      handler: async (_req, res) => {
        const records = await listRecords(resourceName);
        sendJson(res, 200, {
          data: records
        });
      }
    },
    {
      method: "GET",
      path: `/api/${resourceName}/:id`,
      handler: async (_req, res, params) => {
        const record = await getRecordById(resourceName, params.id);

        if (!record) {
          notFound(res, `${singular} not found`);
          return;
        }

        sendJson(res, 200, {
          data: record
        });
      }
    },
    {
      method: "POST",
      path: `/api/${resourceName}`,
      handler: async (req, res) => {
        try {
          const input = await readJsonBody(req);
          const record = await createRecord(resourceName, input);

          sendJson(res, 201, {
            data: record
          });
        } catch (error) {
          badRequest(res, "Could not create record", error.message);
        }
      }
    },
    {
      method: "POST",
      path: `/api/${resourceName}/:id/archive`,
      handler: async (_req, res, params) => {
        try {
          const record = await archiveRecord(resourceName, params.id);

          if (!record) {
            notFound(res, `${singular} not found`);
            return;
          }

          sendJson(res, 200, {
            data: record
          });
        } catch (error) {
          badRequest(res, "Could not archive record", error.message);
        }
      }
    },
    {
      method: "PATCH",
      path: `/api/${resourceName}/:id`,
      handler: async (req, res, params) => {
        try {
          const input = await readJsonBody(req);
          const record = await updateRecord(resourceName, params.id, input);

          if (!record) {
            notFound(res, `${singular} not found`);
            return;
          }

          sendJson(res, 200, {
            data: record
          });
        } catch (error) {
          badRequest(res, "Could not update record", error.message);
        }
      }
    },
    {
      method: "DELETE",
      path: `/api/${resourceName}/:id`,
      handler: async (_req, res, params) => {
        try {
          const record = await deleteRecord(resourceName, params.id);

          if (!record) {
            notFound(res, `${singular} not found`);
            return;
          }

          sendJson(res, 200, {
            data: record
          });
        } catch (error) {
          badRequest(res, "Could not delete record", error.message);
        }
      }
    }
  ];
}

module.exports = { buildResourceRoutes };
