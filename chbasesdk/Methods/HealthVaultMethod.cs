// (c) Microsoft. All rights reserved
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace CHBase.Foundation.Methods
{
    public abstract class HealthVaultMethod
    {
        CHBaseClient m_client;

        public HealthVaultMethod(CHBaseClient client)
        {
            if (client == null)
            {
                throw new ArgumentNullException("client");
            }

            m_client = client;
        }

        public CHBaseClient Client
        {
            get { return m_client;}
        }

        public abstract Request CreateRequest();
        public async Task<Response> ExecuteAsync()
        {
            return await this.ExecuteAsync(CancellationToken.None);
        }

        public abstract Task<Response> ExecuteAsync(CancellationToken cancelToken);
    }
}
