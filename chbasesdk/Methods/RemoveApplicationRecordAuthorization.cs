// (c) Microsoft. All rights reserved
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CHBase.Foundation.Methods
{
    public class RemoveApplicationRecordAuthorization : HealthVaultMethod
    {
        RecordReference m_record;

        public RemoveApplicationRecordAuthorization(CHBaseClient client, string personID, string recordID)
            : this(client, new RecordReference(personID, recordID))
        {
        }

        public RemoveApplicationRecordAuthorization(CHBaseClient client, RecordReference record)
            : base(client)
        {
            if (record == null)
            {
                throw new ArgumentNullException("record");
            }
            m_record = record;
        }

        public override Request CreateRequest()
        {
            Request request = new Request("RemoveApplicationRecordAuthorization", 1);
            request.Record = m_record;
            return request;
        }

        public override Task<Response> ExecuteAsync(CancellationToken cancelToken)
        {
            Request request = this.CreateRequest();
            return this.Client.ExecuteRequestAsync(request, null, cancelToken);
        }
    }
}
