// (c) Microsoft. All rights reserved

using System;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using CHBase.Foundation;
using CHBase.Foundation.Types;

namespace CHBase.Sample
{
    public sealed class ServiceMethodProvider
    {
        private ServiceMethods m_serviceMethods;

        // We can't pass in a HealthVaultClient directly because it's not a WinRT class. :(
        public ServiceMethodProvider(HealthVaultAppSettings appSettings)
        {
            ServiceInfo serviceInfo = (ServiceInfo)ServiceFactory.CreateServiceInfo(
                "http://platform.hvmdev502.grcdev.com/platform/wildcat.ashx",
                "http://sweden-shell.hvmdev502.grcdev.com");

            AppInfo appInfo = new AppInfo();
            appInfo.MasterAppId = Guid.Parse(appSettings.MasterAppId);
            appInfo.IsMultiInstanceAware = true;

            HealthVaultClient client = new HealthVaultClient(
                appInfo,
                serviceInfo,
                appSettings.IsFirstParty,
                appSettings.WebAuthorizer != null ? (IWebAuthorizer)appSettings.WebAuthorizer : null);

            m_serviceMethods = client.ServiceMethods;
        }

        /// <summary>
        /// Demonstrates a basic call to GetServiceDefinition.  
        /// </summary>
        public IAsyncOperation<string> GetServiceDefinitionAsync()
        {
            return AsyncInfo.Run(async cancelToken =>
            {
                GetServiceDefinitionResponse response = await m_serviceMethods.GetServiceDefinition(cancelToken);
                return response.ToXml();
            });
        }

        /// <summary>
        /// Demonstrates a call to GetServiceDefinition that passes in a timestamp that is later
        /// than the last-updated date on the server. No results are returned. You can cache the
        /// GetServiceDefinition response and pass in the timestamp from the response in subsequent
        /// calls, allowing you to poll for updates and only download the full response when data
        /// changes.  
        /// </summary>
        public IAsyncOperation<string> GetServiceDefinitionWithMaxDateAsync()
        {
            return AsyncInfo.Run(async cancelToken =>
            {
                GetServiceDefinitionResponse response = await m_serviceMethods.GetServiceDefinition(System.DateTime.MaxValue, cancelToken);
                return response.ToXml();
            });
        }

        /// <summary>
        /// Demonstrates a call to GetServiceDefinition that only downloads the specified sections
        /// of the response. Only downloading the data you need means a faster response time.
        /// </summary>
        public IAsyncOperation<string> GetServiceDefinitionShellPlatformTopologyAsync()
        {
            return AsyncInfo.Run(async cancelToken =>
            {
                GetServiceDefinitionResponse response = await m_serviceMethods.GetServiceDefinition(
                    new ServiceDefinitionResponseSections[] {
                        ServiceDefinitionResponseSections.Shell,
                        ServiceDefinitionResponseSections.Platform,
                        ServiceDefinitionResponseSections.Topology },
                    cancelToken);
                return response.ToXml();
            });
        }
    }
}
