﻿// (c) Microsoft. All rights reserved
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CHBase.Foundation.Methods
{
    public class GetThings : HealthVaultMethod
    {        
        RecordReference m_record;
        RequestBody m_body;
        Type m_responseType;

        public GetThings(CHBaseClient client, string personID, string recordID, RequestBody body, Type responseType)
            : this(client, new RecordReference(personID, recordID), body, responseType)
        {
        }

        public GetThings(CHBaseClient client, RecordReference record, RequestBody body, Type responseType)
            : base(client)
        {
            if (record == null)
            {
                throw new ArgumentNullException("record");
            }
            if (body == null)
            {
                throw new ArgumentNullException("body");
            }
            if (responseType == null)
            {
                throw new ArgumentNullException("responseType");
            }
            m_record = record;
            m_body = body;
            m_responseType = responseType;
        }

        public override Request CreateRequest()
        {
            Request request = new Request("GetThings", 3, m_body);
            request.Record = m_record;
            return request;
        }

        public override Task<Response> ExecuteAsync(CancellationToken cancelToken)
        {
            Request request = this.CreateRequest();
            return this.Client.ExecuteRequestAsync(request, m_responseType, cancelToken);
        }
    }
}
