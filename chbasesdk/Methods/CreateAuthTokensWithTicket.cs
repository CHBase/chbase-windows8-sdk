// (c) Microsoft. All rights reserved

using System;
using System.Threading;
using System.Threading.Tasks;
using CHBase.Foundation.Types;

namespace CHBase.Foundation.Methods
{
    public class CreateAuthTokensWithTicket : HealthVaultMethod
    {
        MSATicket m_msaTicket;

        public CreateAuthTokensWithTicket(
            CHBaseClient client, 
            string msaTicket)
            : this(client, new MSATicket(msaTicket))
        {
        }

        public CreateAuthTokensWithTicket(
            CHBaseClient client, 
            MSATicket msaTicket)
            : base(client)
        {
            if (msaTicket == null)
            {
                throw new ArgumentNullException("msaTicket");
            }
           
            m_msaTicket = msaTicket;
        }

        public override Request CreateRequest()
        {
            this.Client.VerifyHasProvisioningInfo();

            AppProvisioningInfo provInfo = this.Client.State.ProvisioningInfo;
            CASTRequestParams castRequestParams = new CASTRequestParams(provInfo, this.Client.Cryptographer);

            Request request = new Request("CreateAuthenticationTokensWithTicket", 1, null);
            request.IsAnonymous = true;
            request.Header.AppId = provInfo.AppIdInstance;
            request.Body.Data = new object[] 
            {
                m_msaTicket,
                castRequestParams
            };

            return request;
        }

        public override Task<Response> ExecuteAsync(CancellationToken cancelToken)
        {
            Request request = this.CreateRequest();
            return this.Client.ExecuteRequestAsync(request, typeof(CreateAuthTokensWithTicketResponse), cancelToken);
        }
    }
}